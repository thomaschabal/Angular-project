import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPontheYearComponent } from './team-ponthe-year.component';

describe('TeamPontheYearComponent', () => {
  let component: TeamPontheYearComponent;
  let fixture: ComponentFixture<TeamPontheYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPontheYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPontheYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
