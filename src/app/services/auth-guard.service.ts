import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { routesAppFromRoot } from '../Routes';
import API_ROUTES from './Api';

@Injectable()
export class AuthGuard implements CanActivate {
  hasUserAccessToApp = (this.httpService.token !== null) && (this.httpService.token !== undefined);

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private router: Router) {
                this.getUserByJWT();
              }

  getUserByJWT = async () => {
    await this.httpService.get(API_ROUTES.getUserByJwt).subscribe(
      (response: {admin, promotion}) => {
        this.httpService.isAdmin = response.admin;
        this.httpService.promotion = response.promotion;
        this.hasUserAccessToApp = true;
        console.log('resultat !:!!!!!!!!!!!!!! oui')
        return true; },
      (err) => {
        this.httpService.isAdmin = false;
        this.httpService.promotion = '';
        this.hasUserAccessToApp = false;
        console.log('resultat !:!!!!!!!!!!!!!! non')
        this.router.navigate([routesAppFromRoot.auth]);
        return false;
       }
    );
    console.log(this.httpService.promotion);
    return (this.httpService.promotion !== '');
  }

  canActivate = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log(route, state);
    const ticket = route.queryParams.ticket;
    console.log('ticket', ticket);
    console.log('current token', this.httpService.token);
    const userbyJwt = await this.getUserByJWT();
    console.log(userbyJwt);
    console.log('permission', this.hasUserAccessToApp);
    if (this.httpService.token !== null && this.hasUserAccessToApp) {
      console.log('user ok');
      return true;
    } else {
      console.log('no user, maybe cas ?');
      this.authService.casAuthentication(ticket);
      this.router.navigate([routesAppFromRoot.auth]);
    }
  }
}
