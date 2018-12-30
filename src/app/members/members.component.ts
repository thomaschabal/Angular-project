import { Component, OnInit, OnDestroy } from '@angular/core';
import { MembersService } from '../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  team_ponthe : any[];
  private sub : Subscription;

  constructor(private membersService : MembersService,
              private activeRoute : ActivatedRoute) {
                this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({behavior : 'smooth'}));
              };

  ngOnInit() {
    this.team_ponthe = this.membersService.team_ponthe;
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

}
