import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {NewAccountComponent} from '../new-account/new-account.component'
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserService {

  private users : User[] = [
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

  constructor (private httpClient : HttpClient, private router : Router  ) {}

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }



  addUser(user: User) {
    this.httpClient.post('https://ponthe-testing.enpc.org/api/register', user, httpOptions)
    .subscribe(
      () => {
        console.log('Enregistrement terminé');
        alert("Tu as bien réussi à t'inscrire");
        this.router.navigate(['/auth']);
        ;
      },
      (error) => { console.log('Erreur à l\'enregistrement : ' + error); alert("Tu as fait une erreur, vérifie ton email et ton mot de passe");}
    );
  }
}
