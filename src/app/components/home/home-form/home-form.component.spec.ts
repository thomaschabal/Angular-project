import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { HomeFormComponent } from './home-form.component';

describe('HomeFormComponent', () => {
  let component: HomeFormComponent;
  let fixture: ComponentFixture<HomeFormComponent>;
  const spyMessageService = jasmine.createSpyObj('spyMessageService', ['materialPost']);
  spyMessageService.materialPost.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFormComponent ],
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
    fixture = TestBed.createComponent(HomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inits form', () => {
    expect(component.messageForm.value).toEqual({message: ''});
  });

  it('submits message', () => {
    component.onSubmitMessage();
    expect(spyMessageService.materialPost).toHaveBeenCalledTimes(0);

    const controlName = 'message';
    component.messageForm.controls[controlName].setValue('Hello!');
    component.onSubmitMessage();
    expect(spyMessageService.materialPost).toHaveBeenCalledTimes(1);
  });
});
