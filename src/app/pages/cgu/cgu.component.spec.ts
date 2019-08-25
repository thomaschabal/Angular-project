import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CguComponent } from './cgu.component';
import { AuthService } from '../../services/auth.service';

describe('CguComponent', () => {
  let component: CguComponent;
  let fixture: ComponentFixture<CguComponent>;
  const spyAuthService = jasmine.createSpyObj('spyAuthService', ['getCGU']);
  const fakeCGU = {
    articles: {
      1: {
        title: 'Test title',
        body: 'Test body',
      },
      2: {
        title: 'Test title',
        body: 'Test body',
      },
    },
  };
  spyAuthService.getCGU.and.returnValue(of(fakeCGU));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CguComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: spyAuthService,
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stores the right cgu', () => {
    const fakeCGUArticles = [
      {
        title: 'Test title',
        body: 'Test body',
      },
      {
        title: 'Test title',
        body: 'Test body',
      },
    ];
    expect(component.articles).toEqual(fakeCGUArticles);
  });
});
