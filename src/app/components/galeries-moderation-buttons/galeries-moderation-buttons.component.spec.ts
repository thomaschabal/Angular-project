import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriesModerationButtonsComponent } from './galeries-moderation-buttons.component';

describe('GaleriesModerationButtonsComponent', () => {
  let component: GaleriesModerationButtonsComponent;
  let fixture: ComponentFixture<GaleriesModerationButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriesModerationButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriesModerationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
