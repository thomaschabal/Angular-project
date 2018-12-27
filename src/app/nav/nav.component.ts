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

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  isOnline() {
    return (this.authService.isAuth === true);
  }

  onSignIn() {
    this.authService.signIn();
    this.authStatus = this.authService.isAuth;
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
    this.router.navigate(['auth']);
  }

}
