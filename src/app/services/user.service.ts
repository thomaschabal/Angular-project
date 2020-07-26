import { Injectable } from '@angular/core';

import { User } from '@src/app/models/User.model';
import { HttpService } from '@src/app/services/http.service';
import API_ROUTES from '@src/app/services/Api';

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
