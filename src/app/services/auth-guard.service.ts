import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService, NULL_TOKEN } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate = async (
    route: ActivatedRouteSnapshot
  ) => {
    const token = route.queryParams.token;
    if (NULL_TOKEN.indexOf(token) === -1) {
      this.authService.authenticate(token);
    }
    this.authService.getUserByJWT();
    if (this.authService.isAuth) {
      return true;
    }
    return false;
  }
}
