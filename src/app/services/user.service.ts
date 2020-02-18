import { Injectable } from '@angular/core';

import { User } from '../models/User.model';
import { HttpService } from './http.service';
import API_ROUTES from './Api';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService ) {}

  addUser(user: User) {
    return this.httpService.post(API_ROUTES.register, user);
  }

  resetUser(form: object) {
    return this.httpService.post(API_ROUTES.reset, form);
  }
}
