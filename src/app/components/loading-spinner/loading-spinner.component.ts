import { Component, OnInit } from '@angular/core';

import { PATH_LOADING_SPINNER } from '../../Constants';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  pathLoadingSpinner = PATH_LOADING_SPINNER;

  constructor() { }

  ngOnInit() {
  }
}
