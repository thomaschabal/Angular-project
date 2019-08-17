import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCreationFormComponent } from './gallery-creation-form.component';

describe('GalleryCreationFormComponent', () => {
  let component: GalleryCreationFormComponent;
  let fixture: ComponentFixture<GalleryCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
