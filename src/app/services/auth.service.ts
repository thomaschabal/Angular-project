import { HttpClient } from '@angular/common/http';
import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isAuth: boolean;
  token: string;

  constructor(private httpClient: HttpClient,
              private httpService: HttpService,
              private router: Router) {
    this.isAuth = false;
  }


  // Get the User Conditions
  getCGU() {
    return this.httpService.get('/cgu');
  }


  // Login : request to the server and update of the information on the user
  signIn(user: LoggingUser) {
    this.httpService.post('/login', user).subscribe(
      (res: { token }) => {
        this.httpService.token = res.token;
        this.isAuth = true;
        this.router.navigate(['/home']);
        this.httpService.get('/get-user-by-jwt').subscribe(
          (response: { admin, promotion }) => {
            this.httpService.isAdmin = response.admin;
            this.httpService.promotion = response.promotion;
          },
          (err) => { console.error(err); }
        );
      },
      (error) => { alert('Si tu as déjà validé ton compte : mauvais identifiant ou mauvais mot de passe'); }
    );
  }

  // Logout
  signOut() {
    this.httpService.token = null;
    this.isAuth = false;
  }

}
