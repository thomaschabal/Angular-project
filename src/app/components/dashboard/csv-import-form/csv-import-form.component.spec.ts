import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvImportFormComponent } from './csv-import-form.component';
import { DashboardFormComponent } from '../dashboard-form/dashboard-form.component';

describe('CsvImportFormComponent', () => {
  let component: CsvImportFormComponent;
  let fixture: ComponentFixture<CsvImportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvImportFormComponent, DashboardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
