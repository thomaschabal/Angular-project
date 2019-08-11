import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private router: Router) { }

  getUserByJWT() {
    return this.httpService.get('/api/get-user-by-jwt').subscribe(
      (response: {admin, promotion}) => {
        this.httpService.isAdmin = response.admin;
        this.httpService.promotion = response.promotion;
        return true; },
      (err) => {
        this.httpService.isAdmin = false;
        this.httpService.promotion = '';
        return false;
       }
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.httpService.token && this.getUserByJWT()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
