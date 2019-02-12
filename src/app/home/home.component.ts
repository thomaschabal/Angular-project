import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { transition, trigger, style, animate, state } from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    trigger('introTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('350ms') ] ),
    ]),
    trigger('lastEventTrigger', [
      state('visible', style({})),
      state('hidden-left', style({transform : 'translateX(40vw)'})),
      state('hidden-right', style({transform : 'translateX(-40vw)'})),
      transition('* => *', [ animate('20ms') ] ),
    ]),
    trigger('lovePicsTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden-left', style({opacity: 0, transform : 'translateX(-14em)'})),
      state('hidden-right', style({opacity: 0, transform : 'translateX(14em)'})),
      transition('* => *', [ animate('20ms') ] ),
    ]),
    trigger('formTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0, transform : 'translateY(75vh)'})),
      transition('* => *', [ animate('20ms') ] ),
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  // Data to show to the user
  last_events : any[];
  love_pics : any[];

  // Routes to galeries regarding main events
  adresse_1 : string;
  adresse_2 : string;
  adresse_3 : string;

  private sub : Subscription;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introState = 'hidden';
  lastEventsState1 = 'hidden-left';
  lastEventsState2 = 'hidden-right';
  lastEventsState3 = 'hidden-left';
  lovePicsStateLeft = 'hidden-left';
  lovePicsStateRight = 'hidden-right';
  formState = 'hidden';

  constructor(private homeService : HomeService,
              private activeRoute : ActivatedRoute) {
                this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' }));
              };

  ngOnInit() {
    this.last_events = this.homeService.last_events;
    this.love_pics = this.homeService.love_pics;
    this.adresse_1 = this.last_events[0].fond;
    this.adresse_2 = this.last_events[1].fond;
    this.adresse_3 = this.last_events[2].fond;
  }

  onSubmit(form : NgForm) {
    const name = form.value['name'];
    const email = form.value['email'];
    const message = form.value['message'];
    console.log (name + ", dont le mail est " + email + ", vous dit : " + message);
  }

  placement_events(i : number) {
    if (i%2 === 0) {
      return "right";
    } else {
      return "left";
    }
  }

  placement_love_pics(i : number) {
    if (i%2 === 0) {
      return "from-left";
    } else {
      return "from-right";
    }
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

  survoleIntro(state : string) {
    this.introState = state;
  }

  survoleEvent(state : string, i : number){
    if (state === "visible") {
      if (i === 0) {
        this.lastEventsState1 = state;
      } else {
        if (i === 1) {
          this.lastEventsState2 = state;
        }
        else {
          this.lastEventsState3 = state;
        }
      }
    } else {
      if (i === 0) {
        this.lastEventsState1 = "hidden-left";
      } else {
        if (i === 1) {
          this.lastEventsState2 = "hidden-right";
        }
        else {
          this.lastEventsState3 = "hidden-left";
        }
      }
    }
  }

  currentStateEvent(i : number) {
    if (i === 0) {
      return this.lastEventsState1;
    } else {
      if (i === 1) {
        return this.lastEventsState2;
      }
      else {
        return this.lastEventsState3;
      }
    }
  }

  survoleCoeur(state : string){
    if (state === "visible") {
      this.lovePicsStateLeft = state;
      this.lovePicsStateRight = state;
    } else {
      this.lovePicsStateLeft = "hidden-left";
      this.lovePicsStateRight = "hidden-right";
    }
  }

  currentStateLovePics(i : number) {
    if (i%2 === 0) {
      return this.lovePicsStateLeft;
    } else {
      return this.lovePicsStateRight;
    }
  }

  survoleForm(state : string) {
    this.formState = state;
  }
}
