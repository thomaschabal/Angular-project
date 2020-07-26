import { Injectable } from '@angular/core';

import { HttpService } from '@src/app/services/http.service';
import API_ROUTES from '@src/app/services/Api';
import { MaterialMessage, Message } from '@src/app/types/messages.types';

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
