import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  const spyAuthService = jasmine.createSpyObj('spyAuthService', ['signOut']);
  const spyHttpService = jasmine.createSpyObj('spyHttpService', ['constructor']);
  const spyRouter = jasmine.createSpyObj('spyRouter', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: spyAuthService,
        },
        {
          provide: HttpService,
          useValue: spyHttpService,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check auth status', () => {
    spyAuthService.isAuth = true;
    const authStatusTrue = component.isOnline();
    expect(authStatusTrue).toEqual(true);

    spyAuthService.isAuth = false;
    const authStatusFalse = component.isOnline();
    expect(authStatusFalse).toEqual(false);
  });

  it('check admin status', () => {
    spyHttpService.isAdmin = true;
    const adminStatusTrue = component.isAdmin();
    expect(adminStatusTrue).toEqual(true);

    spyHttpService.isAdmin = false;
    const adminStatusFalse = component.isAdmin();
    expect(adminStatusFalse).toEqual(false);
  });

  it('renders title depending on support', () => {
    expect(component.isWideEnough()).toEqual(true);
  });

  it('sign out works', () => {
    component.onSignOut();
    expect(spyAuthService.signOut).toHaveBeenCalledTimes(1);
    expect(spyRouter.navigate).toHaveBeenCalledTimes(1);
  });
});
