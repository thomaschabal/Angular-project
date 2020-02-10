import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { HttpService } from './http.service';
import { HomeService } from './home.service';
import { Phrases } from '../Phrases';
import { routesAppFromRoot } from '../Routes';
import API_ROUTES from './Api';
import { BehaviorSubject } from 'rxjs';

export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {
  isAuth: boolean;
  
  loginError = false;
  loginErrorSource = new BehaviorSubject(false);
  loginErrorStream = this.loginErrorSource.asObservable();

  constructor(private httpService: HttpService,
              private homeService: HomeService,
              private router: Router) {
    this.isAuth = false;
    this.getUserInfos();
  }

  getUserInfos() {
    this.getToken();
    if (this.httpService.token) {
      this.getUserByJWT();
    }
  }

  getToken(): string {
    this.httpService.token = localStorage.getItem(TOKEN_NAME);
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string) {
    this.httpService.token = token;
    localStorage.setItem(TOKEN_NAME, token);
  }

  getUserByJWT() {
    this.httpService.get(API_ROUTES.getUserByJwt).subscribe(
      (response: {admin, promotion}) => {
        this.httpService.isAdmin = response.admin;
        this.httpService.promotion = response.promotion;
        this.isAuth = true;
      },
      (err) => {
        this.httpService.isAdmin = false;
        this.httpService.promotion = '';
        this.isAuth = false;
        this.router.navigate([routesAppFromRoot.auth]);
       }
    );
  }

  // Unused because of a lack of expiration date in JWT
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.iat === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.iat);
    return date;
  }

  // Unused because of a lack of expiration date in JWT
  isExpiredToken(token?: string) {
    if (!token) { token = this.getToken(); }
    if (!token || token === '') { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !( date.getTime() + 3 * 3600 > (new Date().getTime()) );
  }

  // Get the User Conditions
  getCGU() {
    return this.httpService.get(API_ROUTES.cgu);
  }

  updateLoginError(newState: boolean) {
    this.loginError = newState;
    this.loginErrorSource.next(newState);
  }

  // Login : request to the server and update of the information on the user
  signIn(user: LoggingUser) {
    this.httpService.post(API_ROUTES.login, user).subscribe(
      (res: { token }) => {
        this.setToken(res.token);
        this.isAuth = true;
        this.router.navigate([routesAppFromRoot.home]);
        this.getUserByJWT();
        this.homeService.getLatestGalleries();
        this.homeService.getLovePics();
      },
      (error) => { this.updateLoginError(true); }
    );
  }

  // Logout
  signOut() {
    this.setToken(null);
    this.isAuth = false;
    this.httpService.isAdmin = false;
    this.httpService.promotion = null;
  }
}
