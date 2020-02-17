import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderPontheComponent } from './loader-ponthe.component';

describe('LoaderPontheComponent', () => {
  let component: LoaderPontheComponent;
  let fixture: ComponentFixture<LoaderPontheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderPontheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderPontheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
