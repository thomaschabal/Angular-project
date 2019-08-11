import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriesFooterComponent } from './galeries-footer.component';

describe('GaleriesFooterComponent', () => {
  let component: GaleriesFooterComponent;
  let fixture: ComponentFixture<GaleriesFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriesFooterComponent ]
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
});
