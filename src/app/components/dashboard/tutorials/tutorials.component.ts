import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import TUTORIALS from '../../../constants/Tutoriels';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {
  tutorials = Object.keys(TUTORIALS).map(key => TUTORIALS[key]);
  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  closeTutos() {
    this.close.next();
  }

}
