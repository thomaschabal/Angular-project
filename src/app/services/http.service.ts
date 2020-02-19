import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  // Variables containing the address of the back, the user's token and his status (user or admin)
  token: string | null;
  isAdmin: boolean;
  promotion: string | null;

  currentGallery: string;

  constructor(private httpClient: HttpClient) { }

  getHeaderFromToken() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    });
  }

  // Method get : require the route from the API
  get(path: string) {
    const httpOptions = {
      headers: this.getHeaderFromToken(),
      withCredentials: true
    };
    return this.httpClient.get(environment.apiUrl + path, httpOptions);
  }

  getV1(path: string) {
    const httpOptions = {
      headers: this.getHeaderFromToken()
    };
    return this.httpClient.get(environment.baseUrl + '/v1' + path, httpOptions);
  }

  // Méthode post
  post(path: string, body: any) {
    const httpOptions = {
      headers: this.getHeaderFromToken()
    };
    return this.httpClient.post(environment.apiUrl + path, body, httpOptions);
  }

  // Méthode post pour des fichiers
  postFiles(path: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.token,
        enctype: 'multipart/form-data'
      })
    };
    return this.httpClient.post(environment.apiUrl + path, body, httpOptions);
  }

  // Méthode delete
  delete(path: string) {
    const httpOptions = {
      headers: this.getHeaderFromToken()
    };
    return this.httpClient.delete(environment.apiUrl + path, httpOptions);
  }
}
