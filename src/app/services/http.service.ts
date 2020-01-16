import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  // Variables containing the address of the back, the user's token and his status (user or admin)
  apiUrl: string;
  token: string;
  isAdmin: boolean;
  promotion: string;

  currentGallery: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getHeaderFromToken(token: string) {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    });
  }

  // Method get : require the route from the API
  get(path: string) {
    const httpOptions = {
      headers: this.getHeaderFromToken(this.token)
    };
    return this.httpClient.get(this.apiUrl + path, httpOptions);
  }

  // Méthode post
  post(path: string, body: any) {
    const httpOptions = {
      headers: this.getHeaderFromToken(this.token)
    };
    return this.httpClient.post(this.apiUrl + path, body, httpOptions);
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
    return this.httpClient.post(this.apiUrl + path, body, httpOptions);
  }

  // Méthode delete
  delete(path: string) {
    const httpOptions = {
      headers: this.getHeaderFromToken(this.token)
    };
    return this.httpClient.delete(this.apiUrl + path, httpOptions);
  }
}
