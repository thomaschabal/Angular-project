import { Component, OnInit } from '@angular/core';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-csv-import-form',
  templateUrl: './csv-import-form.component.html',
  styleUrls: ['./csv-import-form.component.scss']
})
export class CsvImportFormComponent implements OnInit {
  displayForm = false;
  phrases = Phrases;

  constructor() { }

  ngOnInit() {
  }

  // Create gallery form visibility
  formVisibility() {
    this.displayForm = !this.displayForm;
  }

  upload_csv() {
    const files = (document.getElementById('csv_account_creation') as HTMLInputElement).files[0];
    console.log(files);
  }
}
