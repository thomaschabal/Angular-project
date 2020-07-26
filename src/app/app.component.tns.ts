import { Component, OnInit } from '@angular/core';
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  private _sideDrawerTransition: DrawerTransitionBase;

  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
      return this._sideDrawerTransition;
  }

  closeDrawer() {
    const sideDrawer = app.getRootView() as RadSideDrawer;
    sideDrawer.closeDrawer();
  }
}
