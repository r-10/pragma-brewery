import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyDashboardComponent } from './journey-dashboard.component';

describe('JourneyDashboardComponent', () => {
  let component: JourneyDashboardComponent;
  let fixture: ComponentFixture<JourneyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
