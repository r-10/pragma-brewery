import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JourneyListComponent } from './journey-tracker/journey-list/journey-list.component';
import { JourneyDashboardComponent } from './journey-tracker/journey-dashboard/journey-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'journeys', pathMatch: 'full' },
  { path: 'journeys', component: JourneyListComponent },
  { path: 'journey/:id/dashboard', component: JourneyDashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
