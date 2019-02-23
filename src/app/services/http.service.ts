import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable()
export class HttpService {

  // Variables containing the adress of the back, the user's token and his status (user or admin)
  apiUrl : string;
  token : string;
  isAdmin : boolean;

  constructor(private httpClient : HttpClient,
              private configService : ConfigService,
            private router : Router) {
    this.apiUrl = 'https://ponthe-testing.enpc.org';
  }


  // Méthod get : require the route from the API
  get(path : string) {
    return new Promise(
      (resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + this.token
          })
        };
        this.httpClient.get(this.apiUrl + path, httpOptions)
        .subscribe(
          (res) => {
            console.log(res);
            return resolve(res);
          },
          (error) => { console.log("Erreur " + error.status);
                        if (error.status === 403){
                          this.router.navigate(['auth']);
                        }
                        reject(error); }
        );
      }
    )

  }

  get2(path : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + this.token
      })
    };
    return this.httpClient.get(this.apiUrl + path, httpOptions);
  }

  // Méthode post, qui retourne une Promise afin de gérer le caractère asynchrone des échanges avec le serveur
  post(path : string, body : any) {
    return new Promise(
      (resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + this.token
          })
        };
        this.httpClient.post(this.apiUrl + path, body, httpOptions)
        .subscribe(
          (res) => {
            console.log(res);
            return resolve(res);
          },
          (error) => { console.log("Erreur " + error);
                        reject(error);}
        );
      }
    );

  }

  post2(path : string, body : any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + this.token
      })
    };
    return this.httpClient.post(this.apiUrl + path, body, httpOptions);
  }
}
