import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MembersService } from '@src/app/services/members.service';
import { routesAppFromRoot } from '@src/app/Routes';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations : [
    trigger('introTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('350ms') ] ),
    ])
  ]
})

export class MembersComponent implements OnInit, OnDestroy {

  routes = routesAppFromRoot;
  // Data to show to the user
  fragmentIntro = '';
  teamPonthe: any[];
  private sub: Subscription;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introState = 'visible';

  constructor(private membersService: MembersService,
              private activeRoute: ActivatedRoute) {
    // Smooth transitions when clicking on the arrows
    // this.sub = activeRoute.fragment.pipe(filter(f => !!f))
    //   .subscribe(
    //     f => document.getElementById(f).scrollIntoView({behavior : 'smooth'})
    //   );
  }

  ngOnInit() {
    // Get the list of members
    this.membersService.getMembers().subscribe(
      (res: { team_ponthe }) => {
        this.teamPonthe = res.team_ponthe;
        this.fragmentIntro = this.teamPonthe[0].year_id;
      },
      (error) => { console.log(error); }
    );
  }

  public ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  survoleIntro(stateIntro: string) {
    this.introState = stateIntro;
  }

  onClickNext(fragment: string) {
    // document.getElementsByClassName(fragment)[0].scrollIntoView({ behavior: 'smooth' });
  }
}
