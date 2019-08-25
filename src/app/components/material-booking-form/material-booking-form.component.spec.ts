import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';
import { MaterialBookingFormComponent } from './material-booking-form.component';

describe('MaterialBookingFormComponent', () => {
  let component: MaterialBookingFormComponent;
  let fixture: ComponentFixture<MaterialBookingFormComponent>;
  const spyMessageService = jasmine.createSpyObj('spyMessageService', ['materialPost']);
  spyMessageService.materialPost.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialBookingFormComponent ],
      providers: [
        FormBuilder,
        {
          provide: MessagesService,
          useValue: spyMessageService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inits form', () => {
    const testForm = { matos: '', message: ''};
    expect(component.materialForm.value).toEqual(testForm);
  });

  it('submits message', () => {
    component.onSubmitMateriel();
    expect(spyMessageService.materialPost).toHaveBeenCalledTimes(1);
  });
});
