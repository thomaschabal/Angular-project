import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEventComponent } from './last-event.component';

describe('LastEventComponent', () => {
  let component: LastEventComponent;
  let fixture: ComponentFixture<LastEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
