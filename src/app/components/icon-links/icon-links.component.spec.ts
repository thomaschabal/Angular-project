import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLinksComponent } from './icon-links.component';

describe('IconLinksComponent', () => {
  let component: IconLinksComponent;
  let fixture: ComponentFixture<IconLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
