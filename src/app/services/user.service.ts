import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {NewAccountComponent} from '../new-account/new-account.component'
import { Router } from '@angular/router';
import { HttpService } from './http.service';

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

  constructor (private httpClient : HttpClient, private router : Router, private httpService : HttpService ) {}

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }



  addUser(user: User) {
    this.httpService.post('/api/register', user).then(
      (res) => {
        console.log('Enregistrement terminé');
        this.router.navigate(['/auth']);
        alert("Tu as bien réussi à t'inscrire, tu peux maintenant valider ton inscription dans tes mails")
      },
      (error) => { console.log('Erreur à l\'enregistrement : ' + error); alert("Tu as fait une erreur, vérifie ton email et ton mot de passe");}
    );
  }
}
