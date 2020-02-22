import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { routesAppFromRoot } from '../Routes';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private httpService: HttpService,
              private router: Router) { }

  canActivate = () => {
    if (this.httpService.isAdmin) {
      return true;
    }
    this.router.navigate([routesAppFromRoot.home]);
    return false;
  }
}
