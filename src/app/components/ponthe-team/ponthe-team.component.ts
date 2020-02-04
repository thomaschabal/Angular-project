import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NUMBER_PICS_BY_PONTHE_TEAM } from 'src/app/constants/Images';

@Component({
  selector: 'app-ponthe-team',
  templateUrl: './ponthe-team.component.html',
  styleUrls: ['./ponthe-team.component.scss'],
  animations : [
    trigger('teamTrigger', [
      state('visible', style({})),
      state('hidden-mid-left', style({transform : 'translateX(65vw)'})),
      state('hidden-mid-right', style({transform : 'translateX(-65vw)'})),
      state('hidden-left', style({transform : 'translateX(100vw)'})),
      state('hidden-right', style({transform : 'translateX(-100vw)'})),
      transition('* => *', [ animate('20ms') ] ),
    ])
  ]
})
export class PontheTeamComponent implements OnInit {
  @Input() team: any;
  @Input() index: number;
  teamId: string;
  teamStateLeft = 'hidden-left';
  teamStateRight = 'hidden-right';
  placement: string;
  numberOfPics: number;

  constructor() { }

  ngOnInit() {
    this.teamId = this.team.year_id + '_0';
    this.placement = (this.index % 2 === 0) ? 'right' : 'left';
    this.numberOfPics = NUMBER_PICS_BY_PONTHE_TEAM[this.team.year];
  }

  isMobile() {
    return window.innerWidth <= 736;
  }

  survoleTeam(stateTeam: string) {
    if (stateTeam === 'visible') {
      if (this.index % 2 === 0) {
        this.teamStateLeft = stateTeam;
      } else {
        this.teamStateRight = stateTeam;
      }
    } else {
      if (this.index % 2 === 0) {
        this.teamStateLeft = (this.isMobile() ? 'hidden-left' : 'hidden-mid-left');
      } else {
        this.teamStateRight = (this.isMobile() ? 'hidden-right' : 'hidden-mid-right');
      }
    }
  }

  currentStateTeam() {
    return (this.index % 2 === 0) ? this.teamStateLeft : this.teamStateRight;
  }

  onClickNext(fragment: string) {
    document.getElementsByClassName(fragment)[0].scrollIntoView({ behavior: 'smooth' });
  }

  changeBg(increment: number) {
    const idCurrentPic = this.teamId.slice(-1)[0];
    const newIndex = (parseInt(idCurrentPic) + 2 + increment) % this.numberOfPics;
    this.teamId = this.teamId.slice(0, -1) + newIndex;
  }
}
