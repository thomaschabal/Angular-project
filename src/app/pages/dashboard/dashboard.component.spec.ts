import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GalleryCreationFormComponent } from '../../components/gallery-creation-form/gallery-creation-form.component';
import { NavigationButtonComponent } from '../../components/navigation-button/navigation-button.component';
import { FormBuilder } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const spyRouter = jasmine.createSpyObj('spyRouter', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        GalleryCreationFormComponent,
        NavigationButtonComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: spyRouter,
        },
        FormBuilder
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigation to moderation works', () => {
    component.navigateToModeration();
    expect(spyRouter.navigate).toHaveBeenCalledTimes(1);
  });

  it('form visibility works', () => {
    expect(component.eventCreationSelect).toEqual(false);
    component.formVisibility();
    expect(component.eventCreationSelect).toEqual(true);
    component.formVisibility();
    expect(component.eventCreationSelect).toEqual(false);
  });
});
