import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { GaleriesContactFormComponent } from './galeries-contact-form.component';

describe('GaleriesContactFormComponent', () => {
  let component: GaleriesContactFormComponent;
  let fixture: ComponentFixture<GaleriesContactFormComponent>;
  const spyMessageService = jasmine.createSpyObj('spyMessageService', ['materialPost']);
  spyMessageService.materialPost.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriesContactFormComponent ],
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
    fixture = TestBed.createComponent(GaleriesContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates form', () => {
    const testForm = { matos: '', message: ''};
    expect(component.messageForm.value).toEqual(testForm);
  });

  it('should submit message', () => {
    component.onSubmitMessage();
    expect(spyMessageService.materialPost).toHaveBeenCalled();
  });
});
