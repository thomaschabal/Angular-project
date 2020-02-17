import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { CsvImportFormComponent } from '../../components/dashboard/csv-import-form/csv-import-form.component';
import { DashboardFormComponent } from '../../components/dashboard/dashboard-form/dashboard-form.component';
import { GalleryCreationFormComponent } from '../../components/dashboard/gallery-creation-form/gallery-creation-form.component';
import { NavigationButtonComponent } from '../../components/navigation-button/navigation-button.component';
import { GaleriesService } from '../../services/galeries.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const spyRouter = jasmine.createSpyObj('spyRouter', ['navigate']);
  const spyGaleriesService = jasmine.createSpyObj('spyGaleriesService', ['signIn']);
  spyGaleriesService.signIn.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CsvImportFormComponent,
        DashboardComponent,
        DashboardFormComponent,
        GalleryCreationFormComponent,
        NavigationButtonComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: spyRouter,
        },
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        {
          provide: GaleriesService,
          useValue: spyGaleriesService
        },
      ],
      imports: [
        ReactiveFormsModule,
      ]
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
});
