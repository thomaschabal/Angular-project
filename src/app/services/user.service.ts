import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';
import { NewAccountComponent } from '../pages/new-account/new-account.component';
import { HttpService } from './http.service';
import { Phrases } from '../Phrases';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

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
    this.httpService.post('/api/register', user).subscribe(
      (res) => {
        this.router.navigate(['/auth']);
        alert(Phrases['signup.successSignup']);
      },
      (error) => {
        // console.log('Erreur à l\'enregistrement : ' + error);
        alert(Phrases['signup.error']);
      }
    );
  }

  resetUser(form: object) {
    return this.httpService.post('/api/reset', form);
  }
}
