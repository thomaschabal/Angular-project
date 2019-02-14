import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  //isAuth = false;
  token : string;
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService,
              private httpService : HttpService,
              private router : Router) {
    //this.apiUrl = this.configService.load().apiUrl;
    this.apiUrl = 'https://ponthe-testing.enpc.org';
  }

  signIn(user: LoggingUser){
    this.httpService.post('/api/login', user).then(
      (res) => {
        this.httpService.token = res["token"];
        this.httpService.get('/api/get-user-by-jwt').then(
          (response) => {
            this.httpService.isAdmin = response["admin"]; this.router.navigate(['/home']);
          },
          (err) => { console.log(err); alert("Mauvais identifiant ou mauvais mot de passe");}
        );
      },
      (error) => {  alert("Mauvais identifiant ou mauvais mot de passe"); }
    );
  }

  signOut() {
    this.httpService.token = null;
  }

}
