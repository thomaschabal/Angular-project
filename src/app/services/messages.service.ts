import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoggingUser } from '../models/LoggingUser.model';
import { Message } from '../models/Message.model';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class MessagesService {
  token0 : string;
  apiUrl0: string;

  constructor(private httpClient: HttpClient,
              private authService : AuthService) {
    //this.apiUrl = this.configService.load().apiUrl;
    this.apiUrl0 = 'https://ponthe-testing.enpc.org';
    this.token0 = this.authService.token;
  }

  materialPost(stuff : Message) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Authorization':'Bearer '+this.token0
      })
    };
    console.log(stuff);
    this.httpClient.post(this.apiUrl0 + '/api/materiel', stuff, httpOptions)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => { console.log(error); }
    );

  }

}
