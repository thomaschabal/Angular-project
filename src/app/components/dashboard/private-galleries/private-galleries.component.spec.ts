import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGalleriesComponent } from './private-galleries.component';

describe('PrivateGalleriesComponent', () => {
  let component: PrivateGalleriesComponent;
  let fixture: ComponentFixture<PrivateGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateGalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
