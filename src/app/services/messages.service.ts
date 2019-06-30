import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MessagesService {

  constructor(private httpService : HttpService) {  }

  materialPost(stuff : object) {
    return this.httpService.post('/api/materiel', stuff);
  }

}
