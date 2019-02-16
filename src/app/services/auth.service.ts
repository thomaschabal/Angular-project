import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isAuth : boolean;
  token : string;
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService,
              private httpService : HttpService,
              private router : Router) {
    //this.apiUrl = this.configService.load().apiUrl;
    this.apiUrl = 'https://ponthe-testing.enpc.org';
    this.isAuth = false;
  }

  // Login : request to the server and update of the information on the user
  signIn(user: LoggingUser){
    this.httpService.post('/api/login', user).then(
      (res) => {
        this.httpService.token = res["token"];
        this.isAuth = true;
        this.router.navigate(['/home']);
        console.log('in signIn '+ this.isAuth)
        this.httpService.get('/api/get-user-by-jwt').then(
          (response) => {
            this.httpService.isAdmin = response["admin"];

          },
          (err) => { console.log(err); }
        );
      },
      (error) => { alert("Si tu as déjà validé ton compte : mauvais identifiant ou mauvais mot de passe") }
    );
  }

  // Logout
  signOut() {
    this.httpService.token = null;
    this.isAuth = false;
  }

}
