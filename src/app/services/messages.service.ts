import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import API_ROUTES from './Api';

interface MaterialMessage {
  device: string;
  message: string;
}

interface Message {
  message: string;
}

@Injectable()
export class MessagesService {

  constructor(private httpService: HttpService) {  }

  materialPost(stuff: MaterialMessage) {
    return this.httpService.post(API_ROUTES.material, stuff);
  }

  messagePost(stuff: Message) {
    return this.httpService.post(API_ROUTES.contact, stuff);
  }
}
