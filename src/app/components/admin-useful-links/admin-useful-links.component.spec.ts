import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsefulLinksComponent } from './admin-useful-links.component';

describe('AdminUsefulLinksComponent', () => {
  let component: AdminUsefulLinksComponent;
  let fixture: ComponentFixture<AdminUsefulLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsefulLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsefulLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
