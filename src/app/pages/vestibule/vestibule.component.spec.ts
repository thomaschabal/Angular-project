import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VestibuleComponent } from './vestibule.component';

describe('VestibuleComponent', () => {
  let component: VestibuleComponent;
  let fixture: ComponentFixture<VestibuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VestibuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VestibuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
