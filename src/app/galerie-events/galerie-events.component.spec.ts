import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieEventsComponent } from './galerie-events.component';

describe('GalerieEventsComponent', () => {
  let component: GalerieEventsComponent;
  let fixture: ComponentFixture<GalerieEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalerieEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalerieEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
