import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  authStatus : boolean;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = (this.authService.token !== null);
  }

  isOnline() {
    return (this.authService.token !== null);
  }

  onSignIn() {
    this.authService.signIn(null);  // FIXME
    this.authStatus = (this.authService.token !== null);
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = (this.authService.token !== null);
    this.router.navigate(['auth']);
  }

}
