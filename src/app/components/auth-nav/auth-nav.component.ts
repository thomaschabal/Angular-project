import { Component, OnInit } from '@angular/core';

import { routesAppFromRoot } from '../../Routes';
import { BREAKPOINTS } from '../../Constants';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})

export class AuthNavComponent implements OnInit {
  routes = routesAppFromRoot;
  isMobile: boolean;
  isHamburgerActive = false;

  constructor() {
  }

  ngOnInit() {
    this.getBreakpoint();
  }

  getBreakpoint() {
    this.isMobile = window.innerWidth <= BREAKPOINTS.SMALL;
  }

  activateHamburger() {
    this.isHamburgerActive = !this.isHamburgerActive;
  }
}
