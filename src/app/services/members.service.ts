import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MembersService {
  team_ponthe = null;

  constructor(private httpService : HttpService) { }


  // Get the list of members
  getMembers() {
    return this.httpService.get('/api/members');
  }
}
