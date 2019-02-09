import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {NewAccountComponent} from '../new-account/new-account.component'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserService {

  private users : User[] = [
    {
    firstname : "guilhem",
    lastname : "bonnieu",
    email : "guilhem.bonnieu",
    promotion : "020",
    password : "J'alAMDBR9",
    confirmation_password: "J'alAMDBR9"
    }
  ];
  userSubject = new Subject<User[]>();

  constructor (private httpClient : HttpClient) {}

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUsersToServer();
    this.emitUsers();
  }

  saveUsersToServer() {
    this.httpClient.post('https://ponthe-testing.enpc.org/api/register', this.users[1], httpOptions)
    .subscribe(
      () => { console.log('Enregistrement terminé'); },
      (error) => { console.log('Erreur à l\'enregistrement : ' + error);}
    );
  }
}
