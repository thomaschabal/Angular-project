import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PicsService } from '../../services/pics.service';
import { ImageViewerComponent } from './image-viewer.component';

@Component({
  selector: 'app-parent',
  template: `<app-image-viewer [indexPicture]="indexPicture"
                               [isGallery]="isGallery"
                               [captionWidePic]="captionWidePic">
             </app-image-viewer>`
})
export class ParentComponent {
  @ViewChild(ImageViewerComponent) child;
  indexPicture = 3;
  isGallery = true;
  captionWidePic = 'image test';
}

describe('ImageViewerComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  const spyPicsService = jasmine.createSpyObj('spyPicsService', ['constructor']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParentComponent,
        ImageViewerComponent,
      ],
      providers: [
        {
          provide: PicsService,
          useValue: spyPicsService,
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component.child).toBeTruthy();
  });

  describe('test navigation between pictures', () => {
    it('navigation on the left works', () => {
      const previousIndex = component.child.indexPicture;
      component.child.navLeft();
      expect(component.child.indexPicture === previousIndex).toBe(false);
      expect(component.child.updateWidePic).toHaveBeenCalledTimes(1);
    });
    it('navigation on the right works', () => {
      const previousIndex = component.child.indexPicture;
      component.child.navRight();
      expect(component.child.indexPicture === previousIndex).toBe(false);
      expect(component.child.updateWidePic).toHaveBeenCalledTimes(1);
    });
  });

  it('arrow interactions', () => {
    expect(component.child.showArrows).toEqual(true);
    component.child.showArrows();
    expect(component.child.showArrows).toEqual(true);
    component.child.hideArrows();
    expect(component.child.showArrows).toEqual(false);
    component.child.showArrows();
    expect(component.child.showArrows).toEqual(true);
  });
});
