import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { HttpService } from './http.service';
import { routesAppFromRoot } from '../Routes';
import API_ROUTES from './Api';

export const TOKEN_NAME = 'jwt_token';
const NULL_TOKEN = [null, 'null', undefined];

@Injectable()
export class AuthService {
  isAuth: boolean;

  loginError = false;

  constructor(private httpService: HttpService,
              private router: Router) {
    this.getUserInfos();
  }

  getUserInfos() {
    this.getToken();
    this.isAuth = NULL_TOKEN.indexOf(this.httpService.token) === -1;
    if (this.isAuth) {
      this.getUserByJWT();
    }
  }

  setUserInfos(admin: boolean, promotion: string | null, permission: boolean) {
    this.httpService.isAdmin = admin;
    this.httpService.promotion = promotion;
    this.isAuth = permission;
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
      (response: { admin: boolean, promotion: string }) => {
        const { admin, promotion } = response;
        this.setUserInfos(admin, promotion, true);
      },
      (err) => {
        this.setUserInfos(false, null, false);
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

  authenticate(token: string) {
    this.setToken(token);
    this.isAuth = true;
    this.router.navigate([routesAppFromRoot.home]);
  }

  casLogin(ticket: string) {
    this.httpService.getV1(API_ROUTES.casLogin + '?ticket=' + ticket).subscribe(() => {});
  }
  casAuthentication(ticket: string) {
    this.httpService.get(API_ROUTES.casAuthenticate + '?ticket=' + ticket).subscribe(
      (res: { access_token }) => {
        this.authenticate(res.access_token);
      },
      (error) => {
        this.loginError = true;
      }
    );
  }

  casProcess(ticket: string) {
    this.casLogin(ticket);
    setTimeout(() => this.casAuthentication(ticket), 1000);
  }

  // Login : request to the server and update of the information on the user
  signIn(user: LoggingUser) {
    this.httpService.post(API_ROUTES.login, user).subscribe(
      (res: { token }) => {
        this.authenticate(res.token);
      },
      (error) => { this.loginError = true; }
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
