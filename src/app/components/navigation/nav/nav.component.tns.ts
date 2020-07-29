import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@src/app/services/auth.service';
import { HttpService } from '@src/app/services/http.service';
import { routesAppFromRoot } from '@src/app/Routes';
import {
  PATH_LOGO_PONTHE_SVG,
  PATH_PICS_SVG,
  PATH_CRUSH_SVG,
  PATH_MOVIES_SVG,
  PATH_DASHBOARD_SVG,
  PATH_MEMBERS_SVG,
  PATH_MATOS_SVG,
  PATH_LOGOUT_SVG
} from '@src/app/constants/Images';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  pathLogo = PATH_LOGO_PONTHE_SVG;
  svgPics = PATH_PICS_SVG;
  svgMovies = PATH_MOVIES_SVG;
  svgCrush = PATH_CRUSH_SVG;
  svgDashboard = PATH_DASHBOARD_SVG;
  svgMembers = PATH_MEMBERS_SVG;
  svgMatos = PATH_MATOS_SVG;
  svgLogout = PATH_LOGOUT_SVG;

  routes = routesAppFromRoot;

  isHamburgerActive = false;

  @Input() closeDrawer: () => void;

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private router: Router) {
  }

  // Boolean showing if the user is authenticated or not
  isOnline() {
    return (this.authService.isAuth);
  }

  // Boolean showing if the user is administrator or not
  isAdmin() {
    return (this.httpService.isAdmin);
  }

  // Sign out when the user clicks on "Déconnexion"
  onSignOut() {
    this.authService.signOut();
    this.router.navigate([routesAppFromRoot.auth]);
  }

  activateHamburger() {
    this.isHamburgerActive = !this.isHamburgerActive;
  }

  closeBurger() {
    this.isHamburgerActive = false;
  }

  activateHamburgerAndLogOut() {
    this.isHamburgerActive = !this.isHamburgerActive;
    this.onSignOut();
  }
}
