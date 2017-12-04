import { TestBed, inject } from '@angular/core/testing';

import { JourneyTrackerService } from './journey-tracker.service';

describe('JourneyTrackerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JourneyTrackerService]
    });
  });

  it('should be created', inject([JourneyTrackerService], (service: JourneyTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
