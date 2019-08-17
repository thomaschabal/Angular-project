import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialBookingFormComponent } from './material-booking-form.component';

describe('MaterialBookingFormComponent', () => {
  let component: MaterialBookingFormComponent;
  let fixture: ComponentFixture<MaterialBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialBookingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
