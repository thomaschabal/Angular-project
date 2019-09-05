import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';
import { HttpService } from './http.service';
import { Phrases } from '../Phrases';

@Injectable()
export class UserService {

  private users: User[] = [
    {
      firstname : 'John',
      lastname : 'Doe',
      email : 'john@doe.org',
      promotion : '022',
      password : 'motdepasse',
      confirmationPassword : 'motdepasse'
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
    this.httpService.post('/register', user).subscribe(
      (res) => {
        this.router.navigate(['/auth']);
        alert(Phrases['signup.successSignup']);
      },
      (error) => {
        alert(Phrases['signup.error']);
      }
    );
  }

  resetUser(form: object) {
    return this.httpService.post('/reset', form);
  }
}
