import {Component, OnDestroy, OnInit} from '@angular/core';
import { Journey } from '../shared/models/journey.interface';
import {Subscription} from 'rxjs/Subscription';
import {JourneyTrackerService} from '../shared/journey-tracker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.css']
})
export class JourneyListComponent implements OnInit, OnDestroy {
  // TODO: add duration to list

  private subscriptions: Subscription[] = [];
  private redirectUser: boolean;
  public journeys: Journey[] = [];

  constructor(private journeyTrackerService: JourneyTrackerService, private router: Router) { }

  ngOnInit() {
    // watch journeys
    this.subscriptions.push(this.journeyTrackerService.getJourneys()
      .subscribe(journeys => this.journeys = journeys));

    // watch active journey. If journey becomes active, redirect user to its dashboard
    this.subscriptions.push(this.journeyTrackerService.getActiveJourney()
      .subscribe(activeJourney => {
        if (activeJourney && this.redirectUser) {
          this.redirectUser = false;
          this.router.navigate(['journey', activeJourney.id, 'dashboard']);
        }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public startJourney(): void {
    this.redirectUser = true;
    this.journeyTrackerService.startJourney();
  }
}
