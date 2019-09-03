import { Component, OnInit } from '@angular/core';

import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})

export class NotfoundComponent implements OnInit {

  phrases: object;

  constructor() {
    this.phrases = Phrases;
  }

  ngOnInit() {
  }
}
