import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }

  onSignIn() {
    this.authService.signIn();
    this.router.navigate(['/home']);
  }

}
