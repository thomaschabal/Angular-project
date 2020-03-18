import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BreakpointsService } from '../../services/breakpoints.service';
import { HomeService } from '../../services/home.service';
import { PicsService } from '../../services/pics.service';
import { routesAppFromRoot } from '../../Routes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    trigger('lastEventTrigger', [
      state('visible', style({})),
      state('hidden-mid-left', style({transform : 'translateX(50vw)'})),
      state('hidden-mid-right', style({transform : 'translateX(-50vw)'})),
      state('hidden-left', style({transform : 'translateX(100vw)'})),
      state('hidden-right', style({transform : 'translateX(-100vw)'})),
      transition('* => *', [ animate('20ms') ] ),
    ]),
  ]
})

export class HomeComponent implements OnInit, OnDestroy {

  // Text to display in the HTML file
  routes = routesAppFromRoot;

  picClicked = false;
  captionWidePic: string;

  private sub: Subscription;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introVisible = false;
  lastEventsState1 = 'hidden-left';
  lastEventsState2 = 'hidden-right';
  lastEventsState3 = 'hidden-left';
  formVisible = false;

  indexPicture: number;

  constructor(public homeService: HomeService,
              public breakpointsService: BreakpointsService,
              private activeRoute: ActivatedRoute,
              private picsService: PicsService) {
    // Smooth transitions on arrow clicks
    this.sub = activeRoute.fragment.pipe(filter(f => !!f))
      .subscribe(
        f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
      );
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.picsService.onChangeCurrentGallery('');
    // Get text
    // Requests to the server, update of previous data
    this.homeService.initHomePage();

    if (this.breakpointsService.isDesktop) {
      this.lastEventsState1 = 'hidden-mid-left';
      this.lastEventsState2 = 'hidden-mid-right';
      this.lastEventsState3 = 'hidden-mid-left';
    } else {
      this.introVisible = true;
      this.formVisible = true;
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  // Information on the positioning of elements
  placement_events(i: number) {
    return (i % 2 === 0 ? 'right' : 'left');
  }

  // Update animations when hovering elements
  survoleIntro(stateIntro: boolean) {
    this.introVisible = stateIntro;
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
        this.lastEventsState1 = (this.breakpointsService.isMobile ? 'hidden-left' : 'hidden-mid-left');
      } else {
        if (i === 1) {
          this.lastEventsState2 = (this.breakpointsService.isMobile ? 'hidden-right' : 'hidden-mid-right');
        } else {
          this.lastEventsState3 = (this.breakpointsService.isMobile ? 'hidden-left' : 'hidden-mid-left');
        }
      }
    }
  }

  survoleForm(stateForm: boolean) {
    this.formVisible = stateForm;
  }

  // Return whether elements are being hovered or not
  currentStateEvent(i: number) {
    return (i === 0 ? this.lastEventsState1
                    : (i === 1 ? this.lastEventsState2 : this.lastEventsState3));
  }

  clickOnNextArrow(fragment: string) {
    document.getElementById(fragment).scrollIntoView({ behavior : 'smooth' });
  }
}
