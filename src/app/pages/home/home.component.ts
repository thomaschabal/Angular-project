import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { HomeService } from '../../services/home.service';
import { PicsService } from '../../services/pics.service';
import { HomeFormComponent } from '../../components/home-form/home-form.component';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

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
      state('hidden-mid-left', style({transform : 'translateX(50vw)'})),
      state('hidden-mid-right', style({transform : 'translateX(-50vw)'})),
      state('hidden-left', style({transform : 'translateX(100vw)'})),
      state('hidden-right', style({transform : 'translateX(-100vw)'})),
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
    ]),
  ]
})

export class HomeComponent implements OnInit, OnDestroy {

  // Text to display in the HTML file
  phrases: object;
  routes = routesAppFromRoot;

  // Data to show to the user
  lastEvents: any[];
  lovePics: any[];

  picClicked = false;
  captionWidePic: string;

  // Routes to galeries regarding 3 last events
  adresse1: string;
  adresse2: string;
  adresse3: string;

  private sub: Subscription;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introState = 'hidden';
  lastEventsState1 = 'hidden-left';
  lastEventsState2 = 'hidden-right';
  lastEventsState3 = 'hidden-left';
  lovePicsStateLeft = 'hidden-left';
  lovePicsStateRight = 'hidden-right';
  formState = 'hidden';

  indexPicture: number;

  constructor(private homeService: HomeService,
              private activeRoute: ActivatedRoute,
              private picsService: PicsService) {
    // Smooth transitions on arrow clicks
    this.sub = activeRoute.fragment.pipe(filter(f => !!f))
      .subscribe(
        f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
      );
  }

  ngOnInit() {
    // Get text
    this.phrases = Phrases;
    // Requests to the server, update of previous data
    this.lastEvents = this.homeService.lastEvents;
    this.lovePics = this.homeService.lovePics;
    // Transfer pics for image viewer
    this.picsService.rawPics = this.homeService.lovePicsSrc;
    this.adresse1 = this.lastEvents[0].fond;
    this.adresse2 = this.lastEvents[1].fond;
    this.adresse3 = this.lastEvents[2].fond;
    this.homeService.getLatestGalleries()
      .subscribe(
        (res: { galleries }) => {
          const lastEvents = res.galleries;
          const idEvents = ['one', 'two', 'three', 'coeur'];
          for (let i = 0; i < lastEvents.length; i++) {
            this.lastEvents[i] = {
              name: lastEvents[i].name,
              fond: lastEvents[i].image,
              routing: lastEvents[i].slug,
              event_id: idEvents[i],
              next_event_id: idEvents[i + 1],
              resume: Phrases['home.noDescription']
            };
          }
     },
      (error) => { }
    );
    if (window.innerWidth > 736) {
      this.lastEventsState1 = 'hidden-mid-left';
      this.lastEventsState2 = 'hidden-mid-right';
      this.lastEventsState3 = 'hidden-mid-left';
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  //// DISPLAY OF THE COMPONENTS, ANIMATIONS ON HOVER
  onClickFavPic(i: number) {
    this.picClicked = true;
    this.captionWidePic = this.lovePics[i].title;
    this.indexPicture = i;

    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    document.getElementById('intro').style.filter = 'blur(8px)';
    for (const event of this.lastEvents) {
      document.getElementById(event.event_id).style.filter = 'blur(8px)';
    }
    document.getElementById('header-content').style.filter = 'blur(8px)';
    document.getElementById('gallery-pics').style.filter = 'blur(8px)';
    document.getElementById('contact').style.filter = 'blur(8px)';
    document.getElementById('footer').style.filter = 'blur(8px)';
  }

  closeWidePic() {
    this.picClicked = false;
    this.indexPicture = null;

    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('intro').style.filter = 'none';
    for (const event of this.lastEvents) {
      document.getElementById(event.event_id).style.filter = 'none';
    }
    document.getElementById('header-content').style.filter = 'none';
    document.getElementById('gallery-pics').style.filter = 'none';
    document.getElementById('contact').style.filter = 'none';
    document.getElementById('footer').style.filter = 'none';
  }

  onChangeIndexPicture(index: number) {
    this.indexPicture = index;
    this.captionWidePic = this.lovePics[this.indexPicture].title;
  }

  closePic() {
    this.closeWidePic();
  }

  // Information on the positioning of elements
  placement_events(i: number) {
    return (i % 2 === 0 ? 'right' : 'left');
  }

  placementLovePics(i: number) {
    return (i % 2 === 0 ? 'from-left' : 'from-right');
  }

  // Update animations when hovering elements
  survoleIntro(stateIntro: string) {
    this.introState = stateIntro;
  }

  survoleEvent(stateEvent: string, i: number) {
    if (stateEvent === 'visible') {
      if (i === 0) {
        this.lastEventsState1 = stateEvent;
      } else {
        if (i === 1) {
          this.lastEventsState2 = stateEvent;
        } else {
          this.lastEventsState3 = stateEvent;
        }
      }
    } else {
      if (i === 0) {
        this.lastEventsState1 = (window.innerWidth <= 736 ? 'hidden-left' : 'hidden-mid-left');
      } else {
        if (i === 1) {
          this.lastEventsState2 = (window.innerWidth <= 736 ? 'hidden-right' : 'hidden-mid-right');
        } else {
          this.lastEventsState3 = (window.innerWidth <= 736 ? 'hidden-left' : 'hidden-mid-left');
        }
      }
    }
  }

  survoleCoeur(stateLovePics: string) {
    if (stateLovePics === 'visible') {
      this.lovePicsStateLeft = stateLovePics;
      this.lovePicsStateRight = stateLovePics;
    } else {
      this.lovePicsStateLeft = 'hidden-left';
      this.lovePicsStateRight = 'hidden-right';
    }
  }

  survoleForm(stateForm: string) {
    this.formState = stateForm;
  }

  // Return whether elements are being hovered or not
  currentStateEvent(i: number) {
    return (i === 0 ? this.lastEventsState1
                    : (i === 1 ? this.lastEventsState2 : this.lastEventsState3));
  }

  currentStateLovePics(i: number) {
    return (i % 2 === 0 ? this.lovePicsStateLeft : this.lovePicsStateRight);
  }
}
