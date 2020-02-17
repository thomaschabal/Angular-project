import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import API_ROUTES from './Api';

@Injectable()
export class MessagesService {

  constructor(private httpService: HttpService) {  }

  materialPost(stuff: object) {
    return this.httpService.post(API_ROUTES.material, stuff);
  }
}
