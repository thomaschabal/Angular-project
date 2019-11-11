import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  routes = routesAppFromRoot;

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

  // Display "Club audiovisuel des Ponts" or not in the header, depending on the window's width
  isWideEnough() {
    return (window.innerWidth >= 1080);
  }
}
