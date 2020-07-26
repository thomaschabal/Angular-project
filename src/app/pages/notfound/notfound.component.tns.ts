import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
// import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
// import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures';

import { PATH_NOT_FOUND_IMAGE } from '@src/app/Constants';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})

export class NotfoundComponent implements OnInit {
  imageNotFound = PATH_NOT_FOUND_IMAGE;

  // @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  // private drawer: RadSideDrawer;
  // drawerLocation = 'Left';

  constructor() {
  }

  ngOnInit() {
  }

//   ngAfterViewInit() {
//     this.drawer = this.drawerComponent.sideDrawer;
// }

// openDrawer(position) {
//   this.drawerLocation = position;
//   setTimeout(() => this.drawer.showDrawer(), 5);
// }
// closeDrawer() {
//   this.drawer.closeDrawer();
// }

// onSwipe(args: SwipeGestureEventData) {
//   console.log('swipe')
//   if (args.direction == 1) {
//       this.openDrawer("Left");
//   } else if (args.direction == 2) {
//       this.openDrawer("Right");
//   }
// }
}
