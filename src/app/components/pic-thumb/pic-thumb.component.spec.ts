import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicThumbComponent } from './pic-thumb.component';

describe('PicThumbComponent', () => {
  let component: PicThumbComponent;
  let fixture: ComponentFixture<PicThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
