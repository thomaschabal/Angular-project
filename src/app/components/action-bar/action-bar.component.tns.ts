import { Component, OnInit } from '@angular/core';
import * as app from 'tns-core-modules/application';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.tns.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  showDrawer() {
    const sideDrawer = app.getRootView() as RadSideDrawer;
    sideDrawer.showDrawer();
  }
}
