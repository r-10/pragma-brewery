import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

// angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatGridListModule, MatCardModule } from '@angular/material';

// modules
import { AppRoutingModule } from './app-routing.module';

// services
import {JourneyTrackerService} from './journey-tracker/shared/journey-tracker.service';

// components
import { AppComponent } from './app.component';
import { JourneyListComponent } from './journey-tracker/journey-list/journey-list.component';
import { JourneyDashboardComponent } from './journey-tracker/journey-dashboard/journey-dashboard.component';
import { TopBarComponent } from './core/top-bar/top-bar.component';
import { SensorApiService } from './core/sensor-api.service';


@NgModule({
  declarations: [
    AppComponent,
    JourneyListComponent,
    JourneyDashboardComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // angular material components
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    // own components
    AppRoutingModule,
  ],
  providers: [
    SensorApiService,
    JourneyTrackerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
