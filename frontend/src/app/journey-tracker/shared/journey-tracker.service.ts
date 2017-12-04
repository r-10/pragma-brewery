import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { SensorApiService } from '../../core/sensor-api.service';

import { Journey } from './models/journey.interface';
import { BeerSpecs } from './models/beer-specs.interface';
import { JourneyLogRecord } from './models/journey-log-record.interface';
import { MeasurementLog } from './models/measurement-log.interface';


@Injectable()
export class JourneyTrackerService {
  private readonly beerSpecs: BeerSpecs[];

  private journeys: Journey[];
  private journeysBroadcast: ReplaySubject<Journey[]> = new ReplaySubject();

  private activeJourney: Journey;
  private activeJourneyBroadcast: ReplaySubject<Journey> = new ReplaySubject();

  private measurementPollingFrequency = 5000;
  private measurementPollingSubscription: Subscription;

  constructor(private sensorApi: SensorApiService) {
    // beer specs
    this.beerSpecs = [
      {
        id: 1,
        title: 'Pilsner',
        minIdealTemperature: 4,
        maxIdealTemperature: 6,
        alertRange: 0.1,
        spoilageTimeSeconds: 20,
      },
      {
        id: 2,
        title: 'IPA',
        minIdealTemperature: 5,
        maxIdealTemperature: 6,
        alertRange: 0.2,
        spoilageTimeSeconds: 10,
      },
      {
        id: 3,
        title: 'Lager',
        minIdealTemperature: 4,
        maxIdealTemperature: 7,
        alertRange: 0.15,
        spoilageTimeSeconds: 25,
      },
      {
        id: 4,
        title: 'Stout',
        minIdealTemperature: 6,
        maxIdealTemperature: 8,
        alertRange: 0.5,
        spoilageTimeSeconds: 30,
      },
      {
        id: 5,
        title: 'Wheat Beer',
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        alertRange: 0.1,
        spoilageTimeSeconds: 5,
      },
      {
        id: 6,
        title: 'Pale Ale',
        minIdealTemperature: 4,
        maxIdealTemperature: 6,
        alertRange: 0.05,
        spoilageTimeSeconds: 40,
      },
    ];

    // init journeys
    this.journeys = [
      {
        id: 1,
        startDate: new Date('2017-12-01T10:24:00'),
        endDate: new Date('2017-12-01T11:48:00'),
      },
      {
        id: 2,
        startDate: new Date('2017-12-02T15:16:00'),
        endDate: new Date('2017-12-02T18:32:00'),
      },
      {
        id: 3,
        startDate: new Date('2017-12-03T14:47:00'),
        endDate: new Date('2017-12-03T19:47:00'),
      },
    ];

    this.journeysBroadcast.next(this.journeys);
  }

  public getJourneys(): Observable<Journey[]> {
    return this.journeysBroadcast.asObservable();
  }

  public getActiveJourney(): Observable<Journey> {
    return this.activeJourneyBroadcast.asObservable();
  }

  private setActiveJourney(activeJourney: Journey): void {
    this.activeJourney = activeJourney;

    if (this.activeJourney) {
      // start polling temperature sensors
      this.resumeMeasurementPoll();
    } else {
      // stop polling temperature sensors
      this.pauseMeasurementPoll();
    }

    this.activeJourneyBroadcast.next(this.activeJourney); // broadcast active journey
    this.journeysBroadcast.next(this.journeys); // broadcast journeys
  }

  public startJourney(): void {
    const logRecord: JourneyLogRecord[] = this.beerSpecs
      .map(beerSpec => ({
        beerId: beerSpec.id,
        title: beerSpec.title,
        currentTemperature: 0,
        minIdealTemperature: beerSpec.minIdealTemperature,
        maxIdealTemperature: beerSpec.maxIdealTemperature,
        status: 'ok',
        logs: [],
        }));

    const newJourneyIndex = this.journeys.push({
      id: this.journeys.length + 1,
      startDate: new Date(),
      logRecord,
    }) - 1;

    this.setActiveJourney(this.journeys[newJourneyIndex]);
  }

  public endActiveJourney(): void {
    if (this.activeJourney) {
      this.activeJourney.endDate = new Date();
      this.setActiveJourney(undefined);
    }
  }

  private pauseMeasurementPoll(): void {
    if (this.measurementPollingSubscription && (!this.measurementPollingSubscription.closed)) {
      console.log('pauseMeasurementPoll');
      this.measurementPollingSubscription.unsubscribe();
    }
  }

  private resumeMeasurementPoll(): void {
    this.measurementPollingSubscription =  Observable.timer(0, this.measurementPollingFrequency)
      .flatMap(() => this.sensorApi.getMeasurements())
      .map((res) => {
        if (res && res.length > 0) {
          this.mapMeasurementsToActiveJourney(res);
        }
      })
      .subscribe();
  }

  private mapMeasurementsToActiveJourney(temperatures: SensorTemperature[]): void {
    if (!this.activeJourney) {
      return;
    }

    temperatures.forEach(temperature => {
      const logRecord: JourneyLogRecord = this.activeJourney.logRecord.find(log => log.beerId === temperature.id);
      const beerSpec = this.beerSpecs.find(spec => spec.id === temperature.id);

      if (!logRecord || !beerSpec) {
        return;
      }

      logRecord.currentTemperature = temperature.temperature;
      const newMeasurementLog = this.createMeasurementLog(temperature, beerSpec);

      logRecord.logs.push(newMeasurementLog);

      if (newMeasurementLog.isWithinAlertRange) {
        logRecord.status = 'warning';
      } else if (newMeasurementLog.isEndangered) {
        logRecord.status = 'endangered';
      } else {
        logRecord.status = 'ok';
      }

      this.activeJourneyBroadcast.next(this.activeJourney); // broadcast active journey
    });
  }

  private createMeasurementLog(temperature: SensorTemperature, beerSpec: BeerSpecs): MeasurementLog {
    const maxTempAlert = beerSpec.maxIdealTemperature * (1 - beerSpec.alertRange);
    const minTempAlert = beerSpec.minIdealTemperature * (1 + beerSpec.alertRange);

    const isWithinAlertRange = (temperature.temperature >= maxTempAlert && temperature.temperature <= beerSpec.maxIdealTemperature) ||
      (temperature.temperature <= minTempAlert && temperature.temperature >= beerSpec.minIdealTemperature);

    const isEndangered = (temperature.temperature < beerSpec.minIdealTemperature) ||
      (temperature.temperature > beerSpec.maxIdealTemperature);

    return {
      measurementTimeSpan: new Date(),
      temperature: temperature.temperature,
      isWithinAlertRange: isWithinAlertRange,
      isEndangered: isEndangered,
    };
  }
}

interface SensorTemperature {
  id: number;
  temperature: number;
}
