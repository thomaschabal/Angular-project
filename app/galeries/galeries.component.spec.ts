import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriesComponent } from './galeries.component';

describe('GaleriesComponent', () => {
  let component: GaleriesComponent;
  let fixture: ComponentFixture<GaleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
