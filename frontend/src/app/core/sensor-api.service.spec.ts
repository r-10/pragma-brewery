import { TestBed, inject } from '@angular/core/testing';

import { SensorApiService } from './sensor-api.service';

describe('SensorApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensorApiService]
    });
  });

  it('should be created', inject([SensorApiService], (service: SensorApiService) => {
    expect(service).toBeTruthy();
  }));
});
