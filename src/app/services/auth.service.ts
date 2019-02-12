import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {
  //isAuth = false;
  token = null;
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService,
              private httpService : HttpService) {
    //this.apiUrl = this.configService.load().apiUrl;
    this.apiUrl = 'https://ponthe-testing.enpc.org';
  }

  signIn(user: LoggingUser){
    this.httpService.post('/api/login', user).then(
      (res) => {

        this.httpService.token = res["token"];
        this.httpService.get('/api/get-user-by-jwt').then(
          (response) => {
            this.httpService.isAdmin = response["admin"];
          },
          (err) => { console.log(err); }
        );

      },
      (error) => { }
    );

  }

  signOut() {
    this.httpService.token = null;
  }

}
