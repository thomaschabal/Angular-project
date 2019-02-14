import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MessagesService {

  constructor(private httpService : HttpService) {  }

  materialPost(stuff : object) {
    this.httpService.post('/api/materiel', stuff).then(
      (res) => {
        console.log(res);
      },
      (error) => { }
    );
  }

}
