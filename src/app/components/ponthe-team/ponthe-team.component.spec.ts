import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontheTeamComponent } from './ponthe-team.component';

describe('PontheTeamComponent', () => {
  let component: PontheTeamComponent;
  let fixture: ComponentFixture<PontheTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontheTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontheTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
