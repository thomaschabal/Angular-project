import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhotoComponent } from './event-photo.component';

describe('EventPhotoComponent', () => {
  let component: EventPhotoComponent;
  let fixture: ComponentFixture<EventPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
