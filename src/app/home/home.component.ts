import { Component, OnInit, OnDestroy } from '@angular/core';
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
    ])
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

  constructor(private homeService : HomeService,
              private httpService : HttpService,
              private messagesService : MessagesService,
              private activeRoute : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder,
              private authService : AuthService) {
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

  onClickFavPic(i : number) {
    this.pic_clicked = true;
    this.wide_pic_ref = this.love_pics[i]["address"];
    this.caption_wide_pic = this.love_pics[i]["title"];
  }

  closeWidePic() {
    this.pic_clicked = false;
    this.wide_pic_ref = null;
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

}
