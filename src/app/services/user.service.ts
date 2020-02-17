import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';
import { HttpService } from './http.service';
import { Phrases } from '../Phrases';
import { routesAppFromRoot } from '../Routes';
import API_ROUTES from './Api';

@Injectable()
export class UserService {

  private users: User[] = [
    {
      firstname : 'John',
      lastname : 'Doe',
      email : 'john@doe.org',
      promotion : '022',
      password : 'motdepasse',
      confirmation_password : 'motdepasse'
    }
  ];
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient,
              private router: Router,
              private httpService: HttpService ) {}

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    return this.httpService.post(API_ROUTES.register, user);
  }

  resetUser(form: object) {
    return this.httpService.post(API_ROUTES.reset, form);
  }
}
