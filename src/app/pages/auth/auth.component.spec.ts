import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthFooterComponent } from '../../components/auth-footer/auth-footer.component';
import { AuthService } from '../../services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const spyAuthService = jasmine.createSpyObj('spyAuthService', ['signIn']);
  spyAuthService.signIn.and.returnValue(of('success'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ReactiveFormsModule ],
      declarations: [ AuthComponent, AuthFooterComponent ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        {
          provide: AuthService,
          useValue: spyAuthService
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
