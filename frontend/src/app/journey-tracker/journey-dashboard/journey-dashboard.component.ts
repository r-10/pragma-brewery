import { Component, OnInit } from '@angular/core';
import {JourneyTrackerService} from '../shared/journey-tracker.service';
import {Subscription} from 'rxjs/Subscription';
import {Journey} from '../shared/models/journey.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-journey-dashboard',
  templateUrl: './journey-dashboard.component.html',
  styleUrls: ['./journey-dashboard.component.scss']
})
export class JourneyDashboardComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public activeJourney: Journey;
  public buttonTxt = 'Back to List';
  constructor(private journeyTrackerService: JourneyTrackerService, private router: Router) { }

  ngOnInit() {
    // watch active journey
    this.subscriptions.push(this.journeyTrackerService.getActiveJourney()
      .subscribe(activeJourney => {
        if (activeJourney) {
         this.buttonTxt = 'End Journey';
        } else {
          this.buttonTxt = 'Back to List';
        }

        this.activeJourney = activeJourney;
      }));
  }

  public endActiveJourney(): void {
    this.router.navigate(['journeys']);
    this.journeyTrackerService.endActiveJourney();
  }
}
