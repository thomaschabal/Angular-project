import { Component, OnInit } from '@angular/core';

import { PATH_NOT_FOUND_IMAGE } from '../../Constants';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})

export class NotfoundComponent implements OnInit {
  imageNotFound = PATH_NOT_FOUND_IMAGE;

  constructor() {
  }

  ngOnInit() {
  }
}
