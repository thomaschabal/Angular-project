import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { EventComponent } from './event.component';
import { GaleriesContactFormComponent } from '../../components/galeries-contact-form/galeries-contact-form.component';
import { GaleriesFooterComponent } from '../../components/galeries-footer/galeries-footer.component';
import { GaleriesModerationButtonsComponent } from '../../components/galeries-moderation-buttons/galeries-moderation-buttons.component';
import { ImageViewerComponent } from '../../components/image-viewer/image-viewer.component';
import { LoadingSpinnerComponent } from '../../components/loaders/loading-spinner/loading-spinner.component';
import { UploadComponent } from '../../components/upload/upload.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventComponent,
        GaleriesContactFormComponent,
        GaleriesFooterComponent,
        GaleriesModerationButtonsComponent,
        ImageViewerComponent,
        LoadingSpinnerComponent,
        UploadComponent,
      ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
