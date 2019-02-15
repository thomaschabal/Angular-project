import { Component, OnInit, OnDestroy } from '@angular/core';
import { MembersService } from '../services/members.service';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { style, state, animate, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations : [
    trigger('introTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('350ms') ] ),
    ]),
    trigger('teamTrigger', [
      state('visible', style({})),
      state('hidden-left', style({transform : 'translateX(65vw)'})),
      state('hidden-right', style({transform : 'translateX(-65vw)'})),
      transition('* => *', [ animate('20ms') ] ),
    ])
  ]
})
export class MembersComponent implements OnInit, OnDestroy {

  // Data to show to the user
  team_ponthe : any[];
  private sub : Subscription;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introState = 'visible';
  teamStateLeft = 'hidden-left';
  teamStateRight = 'hidden-right';

  constructor(private membersService : MembersService,
              private httpService : HttpService,
              private activeRoute : ActivatedRoute) {
                this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({behavior : 'smooth'}));
              };

  ngOnInit() {
    this.httpService.get('/api/members').then(
      (res) => {
        this.team_ponthe = res["team_ponthe"];
      },
      (error) => { console.log(error); }
    );
  }

  placement(i : number) {
    if (i%2 === 0) {
      return "right";
    } else {
      return "left";
    }
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

  survoleIntro(state : string) {
    this.introState = state;
  }

  survoleTeam(state : string, i : number){
    if (state === "visible") {
      if (i%2 === 0) {
        this.teamStateLeft = state;
      } else {
        this.teamStateRight = state;
      }
    } else {
      if (i%2 === 0) {
        this.teamStateLeft = "hidden-left";
      } else {
        this.teamStateRight = "hidden-right";
      }
    }
  }

  currentStateTeam(i : number) {
    if (i%2 === 0) {
      return this.teamStateLeft;
    } else {
      return this.teamStateRight;
    }
  }
}
