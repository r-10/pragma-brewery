import { TestBed, inject } from '@angular/core/testing';

import { JourneyTrackerService } from './journey-tracker.service';
import {SensorApiService} from '../../core/sensor-api.service';
import {Observable} from 'rxjs/Observable';

describe('JourneyTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JourneyTrackerService]
    });
  });

  it('#getValue should return faked value from a fake object', () => {
    const mockSensorApiService = { http: undefined, getMeasurements: () => Observable.of(
      [
        { id: 1, temperature: 6.32 },
        { id: 2, temperature: 5.56 },
        { id: 3, temperature: 7.39 },
        { id: 4, temperature: 5.78 },
        { id: 5, temperature: 4.23 },
        { id: 6, temperature: 2.87 },
        ])
    };

    const service = new JourneyTrackerService(mockSensorApiService as SensorApiService);
  });
});
