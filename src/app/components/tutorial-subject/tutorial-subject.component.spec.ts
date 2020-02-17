import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSubjectComponent } from './tutorial-subject.component';

describe('TutorialSubjectComponent', () => {
  let component: TutorialSubjectComponent;
  let fixture: ComponentFixture<TutorialSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
