import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { LoggingUser } from '../models/LoggingUser.model';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
  //isAuth = false;
  token : string;
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) {
    //this.apiUrl = this.configService.load().apiUrl;
    this.apiUrl = 'https://ponthe-testing.enpc.org';
  }

  signIn(user: LoggingUser){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    };
    this.httpClient.post(this.apiUrl + '/api/login', user, httpOptions)
    .subscribe(
      (res) => {
        this.token = res["token"];
      },
      (error) => {console.log(error);}
    );

    //this.isAuth = true;
    //return new Promise (
      //(resolve, reject) => {
        //setTimeout(
          //() => {
            //this.isAuth=true;
            //resolve(true);
          //}, 500
        //);
      //}
    //);
  }

  signOut() {
    this.token = null;
  }

}
