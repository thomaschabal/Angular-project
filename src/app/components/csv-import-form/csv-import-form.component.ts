import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-import-form',
  templateUrl: './csv-import-form.component.html',
  styleUrls: ['./csv-import-form.component.scss']
})
export class CsvImportFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  upload_csv() {
    const files = (document.getElementById('csv_account_creation') as HTMLInputElement).files[0];
    console.log(files);
  }
}
