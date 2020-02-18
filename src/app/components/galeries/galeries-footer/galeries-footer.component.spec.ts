import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GaleriesFooterComponent } from './galeries-footer.component';
import { GaleriesContactFormComponent } from '../galeries-contact-form/galeries-contact-form.component';
import { Phrases } from '../../../Phrases';
import { routes } from '../../../app-routing.module';

describe('GaleriesFooterComponent', () => {
  let component: GaleriesFooterComponent;
  let fixture: ComponentFixture<GaleriesFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GaleriesFooterComponent,
        GaleriesContactFormComponent,
        Phrases
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('manage footer state changes', () => {
    console.log(component);
    expect(component.footerState).toEqual('hidden');
    component.changeStateFooter();
    expect(component.footerState).toEqual('visible');
    component.changeStateFooter();
    expect(component.footerState).toEqual('hidden');
  });
});
