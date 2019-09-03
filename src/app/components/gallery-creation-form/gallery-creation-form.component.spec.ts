import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GaleriesService } from '../../services/galeries.service';
import { HttpService } from '../../services/http.service';
import { GalleryCreationFormComponent } from './gallery-creation-form.component';

describe('GalleryCreationFormComponent', () => {
  let component: GalleryCreationFormComponent;
  let fixture: ComponentFixture<GalleryCreationFormComponent>;

  const spyGaleriesService = jasmine.createSpyObj('spyGaleriesService', ['postEvent']);
  spyGaleriesService.postEvent.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryCreationFormComponent ],
      providers: [
        {
          provide: GaleriesService,
          useValue: spyGaleriesService
        },
        FormBuilder
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it('creates form', () => {
    const testForm = { name: '', description: '', year_slug: '2019', event_slug: 'event1', boolPrivate: 'on'};
    component.initForm();
    expect(component.eventForm.value).toEqual(testForm);
  });

  it('submits event creation', () => {
    component.onSubmitEvent();
    expect(component.eventForm.value.private).toEqual('on');
    expect(spyGaleriesService.postEvent).toHaveBeenCalled();
  });
});
