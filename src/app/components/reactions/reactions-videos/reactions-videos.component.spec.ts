import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsVideosComponent } from './reactions-videos.component';

describe('ReactionsVideosComponent', () => {
  let component: ReactionsVideosComponent;
  let fixture: ComponentFixture<ReactionsVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
