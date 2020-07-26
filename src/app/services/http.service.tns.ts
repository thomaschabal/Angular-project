import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as applicationSettings from '@nativescript/core/application-settings';

import { environment } from '@src/environments/environment';

export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class HttpService {
  // Variables containing the address of the back, the user's token and his status (user or admin)
  token: string | null;
  isAdmin = true;
  promotion: string | null;

  currentGallery: string;

  constructor(private httpClient: HttpClient) { }

  getToken(): string {
    this.token = applicationSettings.getString(TOKEN_NAME);
    return applicationSettings.getString(TOKEN_NAME);
  }

  setToken(token: string) {
    this.token = token;
    applicationSettings.setString(TOKEN_NAME, token);
  }


  getHeaderFromToken() {
    console.log('token', this.token);
    return new HttpHeaders({
      'Access-Control-Allow-Origin': 'true',
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
    console.log('get', this.getHeaderFromToken(), this.token);
    return this.httpClient.get(environment.apiUrl + path, httpOptions);
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
