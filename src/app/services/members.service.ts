import { Injectable } from '@angular/core';

import { HttpService } from '@src/app/services/http.service';
import API_ROUTES from '@src/app/services/Api';

@Injectable()
export class MembersService {
  teamPonthe = null;

  constructor(private httpService: HttpService) { }

  // Get the list of members
  getMembers() {
    return this.httpService.get(API_ROUTES.members);
  }
}
