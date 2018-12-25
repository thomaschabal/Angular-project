import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovePicsComponent } from './love-pics.component';

describe('LovePicsComponent', () => {
  let component: LovePicsComponent;
  let fixture: ComponentFixture<LovePicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovePicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
