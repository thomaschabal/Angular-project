import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (private httpService : HttpService,
              private router : Router) { }

  canActivate (
    route : ActivatedRouteSnapshot,
    state : RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.httpService.token);
    if (this.httpService.token) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
