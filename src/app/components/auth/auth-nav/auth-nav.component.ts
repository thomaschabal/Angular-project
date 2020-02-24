import { Component, OnInit } from '@angular/core';

import { BreakpointsService } from '../../../services/breakpoints.service';
import { routesAppFromRoot } from '../../../Routes';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})

export class AuthNavComponent implements OnInit {
  routes = routesAppFromRoot;
  isHamburgerActive = false;

  constructor(public breakpointsService: BreakpointsService) { }

  ngOnInit() { }

  activateHamburger() {
    this.isHamburgerActive = !this.isHamburgerActive;
  }
}
