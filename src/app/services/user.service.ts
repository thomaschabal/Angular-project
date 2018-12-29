import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private users : User[] = [
    {
      firstName : 'John',
      lastName : 'Doe',
      email : 'john@doe.org',
      promotion : '022',
      password : 'motdepasse'
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
    this.httpClient.post('https://http-client-ponthe.firebaseio.com/users.json', this.users)
    .subscribe(
      () => { console.log('Enregistrement terminé'); },
      (error) => { console.log('Erreur à l\'enregistrement : ' + error);}
    );
  }
}
