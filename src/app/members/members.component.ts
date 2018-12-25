import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  team_ponthe : any[];

  constructor(private membersService : MembersService) { };

  ngOnInit() {
    this.team_ponthe = this.membersService.team_ponthe;
  }

}
