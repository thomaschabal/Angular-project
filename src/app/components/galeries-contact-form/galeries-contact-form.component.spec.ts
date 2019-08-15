import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriesContactFormComponent } from './galeries-contact-form.component';

describe('GaleriesContactFormComponent', () => {
  let component: GaleriesContactFormComponent;
  let fixture: ComponentFixture<GaleriesContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriesContactFormComponent ]
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
});
