import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HomeService } from '../services/home.service';
import { HttpService } from '../services/http.service';
import { MessagesService } from '../services/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { transition, trigger, style, animate, state } from "@angular/animations";
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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
      state('hidden-left', style({transform : 'translateX(50vw)'})),
      state('hidden-right', style({transform : 'translateX(-50vw)'})),
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
  last_events : any[];
  love_pics : any[];

  pic_clicked = false;
  wide_pic_ref : string;
  caption_wide_pic: string;

  // Routes to galeries regarding 3 last events
  adresse_1 : string;
  adresse_2 : string;
  adresse_3 : string;

  image1 : SafeStyle;

  private sub : Subscription;

  // Form to send a message to the admins of the site
  messageForm : FormGroup;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  introState = 'hidden';
  lastEventsState1 = 'hidden-left';
  lastEventsState2 = 'hidden-right';
  lastEventsState3 = 'hidden-left';
  lovePicsStateLeft = 'hidden-left';
  lovePicsStateRight = 'hidden-right';
  formState = 'hidden';

  showArrows = true;

  constructor(private homeService : HomeService,
              private httpService : HttpService,
              private messagesService : MessagesService,
              private activeRoute : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder,
              private authService : AuthService,
              private sanitizer : DomSanitizer) {
                // Smooth transitions on arrow clicks
                this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' }));
              };

  ngOnInit() {
    // Requests to the server, update of previous data
    this.last_events = this.homeService.last_events;
    this.love_pics = this.homeService.love_pics;
    this.adresse_1 = this.last_events[0].fond;
    this.adresse_2 = this.last_events[1].fond;
    this.adresse_3 = this.last_events[2].fond;
    this.initForm();
    // Redirect unauthenticated users
    if (this.authService.isAuth === false){
      this.router.navigate(['auth']);
    }
    this.homeService.getLatestGalleries()
    .subscribe(
      (res) => {
        const lastEvents = res["galleries"];
        const idEvents = ["one", "two", "three", "coeur"];
        for (let i=0; i<lastEvents.length; i++) {
          this.last_events[i] = {
            "name": lastEvents[i]["name"],
            "fond": lastEvents[i]["image"],
            "routing": lastEvents[i]["slug"],
            "event_id": idEvents[i],
            "next_event_id": idEvents[i+1],
            "resume": "Pas de description pour l'instant."
          };
          console.log(lastEvents[i]["image"]);
        }
        console.log(this.last_events);
        this.image1 = this.sanitizer.bypassSecurityTrustStyle('url("../../assets/assets_h/css/images/overlay.png)');
        console.log(this.image1);
     },
      (error) => { console.error(error); }
    );
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

  // Initialisation of the contact form
  initForm() {
    this.messageForm = this.formBuilder.group({
      message : ['', Validators.required]
    });
  }

  // Submission of the contact form
  onSubmitMessage() {
    this.messagesService.materialPost(this.messageForm.value).subscribe(
      (res) => { alert("Message envoyé !"); },
      (error) => { console.error(error); }
    );
  }


  //// DISPLAY OF THE COMPONENTS, ANIMATIONS ON HOVER
  index_picture : number;

  onClickFavPic(i : number) {
    this.pic_clicked = true;
    this.wide_pic_ref = this.love_pics[i]["address"];
    this.caption_wide_pic = this.love_pics[i]["title"];
    this.index_picture = i;

    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = "none";
    document.getElementById('intro').style.filter = "blur(8px)";
    for (let event = 0; event<this.last_events.length; event++) {
      document.getElementById(this.last_events[event]["event_id"]).style.filter = "blur(8px)";
    }
    document.getElementById('header-content').style.filter = "blur(8px)";
    document.getElementById('gallery-pics').style.filter = "blur(8px)";
    document.getElementById('contact').style.filter = "blur(8px)";
    document.getElementById('footer').style.filter = "blur(8px)";
  }

  closeWidePic() {
    this.pic_clicked = false;
    this.wide_pic_ref = null;
    this.index_picture = null;

    // Remove the blurred background
    document.getElementById('header').style.display = "block";
    document.getElementById('intro').style.filter = "none";
    for (let event = 0; event<this.last_events.length; event++) {
      document.getElementById(this.last_events[event]["event_id"]).style.filter = "none";
    }
    document.getElementById('header-content').style.filter = "none";
    document.getElementById('gallery-pics').style.filter = "none";
    document.getElementById('contact').style.filter = "none";
    document.getElementById('footer').style.filter = "none";
  }


  // Host Listener for the image viewer
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (this.pic_clicked) {
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.navLeft();
      }
      else {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
          this.navRight();
        }
        else {
          if (event.keyCode === KEY_CODE.ESCAPE) {
            this.closeWidePic();
          }
        }
      }
    }
  }

  navLeft() {
    this.index_picture = this.index_picture -1;
    if (this.index_picture <0) {
      this.index_picture += this.love_pics.length;
    }
    this.wide_pic_ref = this.love_pics[this.index_picture]["address"];
    this.caption_wide_pic = this.love_pics[this.index_picture]["title"];
  }

  navRight() {
    this.index_picture = (this.index_picture +1)%(this.love_pics.length);
    this.wide_pic_ref = this.love_pics[this.index_picture]["address"];
    this.caption_wide_pic = this.love_pics[this.index_picture]["title"];
  }



  // Information on the positioning of elements
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


  // Update animations when hovering elements
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

  survoleCoeur(state : string){
    if (state === "visible") {
      this.lovePicsStateLeft = state;
      this.lovePicsStateRight = state;
    } else {
      this.lovePicsStateLeft = "hidden-left";
      this.lovePicsStateRight = "hidden-right";
    }
  }

  survoleForm(state : string) {
    this.formState = state;
  }



  // Return whether elements are being hovered or not
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

  currentStateLovePics(i : number) {
    if (i%2 === 0) {
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
