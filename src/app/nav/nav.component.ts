import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private router: Router) { }

  ngOnInit() { }

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
    this.router.navigate(['/auth']);
  }

  // Display "Club audiovisuel des Ponts" or not in the header, depending on the window's width
  isWideEnough() {
    return (window.innerWidth >= 1080);
  }

  // Display logos instead of text on smartphones
  isNarrowWindow() {
    return (window.innerWidth <= 720);
  }

}
