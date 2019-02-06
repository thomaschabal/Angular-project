import { Component, OnInit, OnDestroy } from '@angular/core';
import { MembersService } from '../services/members.service';
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
      transition('* => *', [ animate('350ms') ] ),
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
  introState = 'hidden';
  teamStateLeft = 'hidden-left';
  teamStateRight = 'hidden-right';

  constructor(private membersService : MembersService,
              private activeRoute : ActivatedRoute) {
                this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({behavior : 'smooth'}));
              };

  ngOnInit() {
    this.team_ponthe = this.membersService.team_ponthe;
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
