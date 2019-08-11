import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/home.service';
import { HttpService } from '../services/http.service';
import { MessagesService } from '../services/messages.service';
import { Phrases } from '../Phrases';

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
    trigger('widePicsAnimation', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('*=>*', [ animate('200ms') ] ),
    ]),
  ]
})

export class HomeComponent implements OnInit, OnDestroy {

  // Data to show to the user
  lastEvents: any[];
  lovePics: any[];

  picClicked = false;
  widePicRef: string;
  captionWidePic: string;

  // Routes to galeries regarding 3 last events
  adresse1: string;
  adresse2: string;
  adresse3: string;

  image1: SafeStyle;

  private sub: Subscription;

  // Form to send a message to the admins of the site
  messageForm: FormGroup;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introState = 'hidden';
  lastEventsState1 = 'hidden-left';
  lastEventsState2 = 'hidden-right';
  lastEventsState3 = 'hidden-left';
  lovePicsStateLeft = 'hidden-left';
  lovePicsStateRight = 'hidden-right';
  formState = 'hidden';

  showArrows = true;

  indexPicture: number;

  constructor(private homeService: HomeService,
              private httpService: HttpService,
              private messagesService: MessagesService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private sanitizer: DomSanitizer) {
                // Smooth transitions on arrow clicks
                this.sub = activeRoute.fragment.pipe(filter(f => !!f))
                  .subscribe(
                    f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
                  );
  }

  ngOnInit() {
    // Requests to the server, update of previous data
    this.lovePics = this.homeService.lovePics;
    this.adresse1 = this.lastEvents[0].fond;
    this.adresse2 = this.lastEvents[1].fond;
    this.adresse3 = this.lastEvents[2].fond;
    this.initForm();
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

  // Initialisation of the contact form
  initForm() {
    this.messageForm = this.formBuilder.group({
      message : ['', Validators.required]
    });
  }

  // Submission of the contact form
  onSubmitMessage() {
    console.log(this.messageForm);
    if (this.messageForm.value.message !== '') {
      this.messagesService.materialPost(this.messageForm.value).subscribe(
        (res) => { alert(Phrases['messages.sent']); },
        (error) => { }
      );
    }
  }

  //// DISPLAY OF THE COMPONENTS, ANIMATIONS ON HOVER
  onClickFavPic(i: number) {
    this.picClicked = true;
    this.widePicRef = this.lovePics[i].address;
    this.captionWidePic = this.lovePics[i].title;
    this.indexPicture = i;

    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    document.getElementById('intro').style.filter = 'blur(8px)';
    for (let event = 0; event < this.lastEvents.length; event++) {
      document.getElementById(this.lastEvents[event].event_id).style.filter = 'blur(8px)';
    }
    document.getElementById('header-content').style.filter = 'blur(8px)';
    document.getElementById('gallery-pics').style.filter = 'blur(8px)';
    document.getElementById('contact').style.filter = 'blur(8px)';
    document.getElementById('footer').style.filter = 'blur(8px)';
  }

  closeWidePic() {
    this.picClicked = false;
    this.widePicRef = null;
    this.indexPicture = null;

    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('intro').style.filter = 'none';
    for (let event = 0; event < this.lastEvents.length; event++) {
      document.getElementById(this.lastEvents[event].event_id).style.filter = 'none';
    }
    document.getElementById('header-content').style.filter = 'none';
    document.getElementById('gallery-pics').style.filter = 'none';
    document.getElementById('contact').style.filter = 'none';
    document.getElementById('footer').style.filter = 'none';
  }


  // Host Listener for the image viewer
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.picClicked) {
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.navLeft();
      } else {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
          this.navRight();
        } else {
          if (event.keyCode === KEY_CODE.ESCAPE) {
            this.closeWidePic();
          }
        }
      }
    }
  }

  navLeft() {
    this.indexPicture = this.indexPicture - 1;
    if (this.indexPicture < 0) {
      this.indexPicture += this.lovePics.length;
    }
    this.widePicRef = this.lovePics[this.indexPicture].address;
    this.captionWidePic = this.lovePics[this.indexPicture].title;
  }

  navRight() {
    this.indexPicture = (this.indexPicture + 1) % (this.lovePics.length);
    this.widePicRef = this.lovePics[this.indexPicture].address;
    this.captionWidePic = this.lovePics[this.indexPicture].title;
  }

  // Information on the positioning of elements
  placement_events(i: number) {
    if (i % 2 === 0) {
      return 'right';
    } else {
      return 'left';
    }
  }

  placementLovePics(i: number) {
    if (i % 2 === 0) {
      return 'from-left';
    } else {
      return 'from-right';
    }
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
        if (window.innerWidth <= 736) {
          this.lastEventsState1 = 'hidden-left';
        } else {
          this.lastEventsState1 = 'hidden-mid-left';
        }
      } else {
        if (i === 1) {
          if (window.innerWidth <= 736) {
            this.lastEventsState2 = 'hidden-right';
          } else {
            this.lastEventsState2 = 'hidden-mid-right';
          }
        } else {
          if (window.innerWidth <= 736) {
            this.lastEventsState3 = 'hidden-left';
          } else {
            this.lastEventsState3 = 'hidden-mid-left';
          }
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
    if (i === 0) {
      return this.lastEventsState1;
    } else {
      if (i === 1) {
        return this.lastEventsState2;
      } else {
        return this.lastEventsState3;
      }
    }
  }

  currentStateLovePics(i: number) {
    if (i % 2 === 0) {
      return this.lovePicsStateLeft;
    } else {
      return this.lovePicsStateRight;
    }
  }

  // Show or hide arrows for the enlarged pics when hovered
  displayArrows() {
    this.showArrows = true;
  }

  hideArrows() {
    this.showArrows = false;
  }
}
