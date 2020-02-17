import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPointsComponent } from './loading-points.component';

describe('LoadingPointsComponent', () => {
  let component: LoadingPointsComponent;
  let fixture: ComponentFixture<LoadingPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
