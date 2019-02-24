import { Component, OnInit, OnDestroy } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { MessagesService } from '../services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { HttpService } from '../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageViewerModule } from "ngx-image-viewer";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  animations : [
    // Hover animation on the pictures
    trigger('picsTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('200ms') ] ),
    ]),
    // Display the footer
    trigger('footerTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(2vh)'})),
      state('hidden', style({opacity : 0})),
      transition('* => *', [ animate('200ms') ] ),
    ]),
  ]
})


export class EventComponent implements OnInit, OnDestroy {

  private sub : Subscription;

  adresse : string;
  pics : any[];
  raw_pics : any[];
  clicked : boolean;

  // About the event
  name : string;
  resume : string;

  // Index of the picture the user clicked on
  indexViewer : number;

  // Variables about the user and the current operations on the event
  isAdmin : boolean;
  isPublic = true;
  enModeration = false;
  selected_route = 'test'

  // Contact form defined here
  messageForm : FormGroup;

  // Animation variables
  picsState = ["visible", "visible", "visible", "visible", "visible", "visible", "visible", "visible", "visible"];
  footerState = "hidden";


  constructor(private galeriesService : GaleriesService,
              private messagesService : MessagesService,
              private activeRoute : ActivatedRoute,
              private httpService : HttpService,
              private formBuilder : FormBuilder) {
      this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' }));
             }

  ngOnInit() {
    this.selected_route = this.activeRoute.snapshot.params['event'];
    // Request of pictures of the event
    this.galeriesService.getEventByName(this.selected_route)
    .subscribe(
      (res) => { this.pics = res["files"];
                 const gallery = res["gallery"];
                 this.name = gallery["name"];
                 this.resume = gallery["description"]; },
      (error) => { console.error(error); }
    );
    this.adresse = this.activeRoute.snapshot.routeConfig.path;
    this.initForm();
    this.isAdmin = this.httpService.isAdmin;
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

  // Initialization of the footer form
  initForm() {
    this.messageForm = this.formBuilder.group({
      matos : '',
      message : ['', Validators.required]
    });
  }

  // Submission of the footer form
  onSubmitMessage() {
    this.messagesService.materialPost(this.messageForm.value).subscribe(
      (res) => { alert("Message envoyé !"); },
      (error) => { console.error(error); }
    );
  }

  // Return whether the administrator is moderating the gallery or not
  modere() {
    this.enModeration = !this.enModeration;
  }

  // Change the state of the gallery to public or private
  publicPrivate() {
    if (this.isPublic) {
      this.galeriesService.makePrivate(this.adresse)
      .subscribe(
        (res) => { this.isPublic = !this.isPublic;
          console.log(res); }
      );
    } else {
      this.galeriesService.makePublic(this.adresse)
      .subscribe(
        (res) => { this.isPublic = !this.isPublic;
          console.log(res); }
      );
    }
  }


  // Image viewer activated on click
  onClick(i_selected_pic) {
    this.raw_pics = [];
    this.indexViewer = i_selected_pic;

    // Get the full images, then store them and display
    for (let i=0; i<this.pics.length; i++){
      this.galeriesService.getFullImage(this.pics[i]['file_path'])
      .subscribe(
        (res) => { this.raw_pics[i] = (res["base64"]); },
        (error) => { console.error(error); }
      );
    }
    this.clicked = true;
}



  //// HOVER ANIMATIONS
  survolePics(state : string) {
    for (let pic = 0; pic < this.picsState.length; pic++) {
      this.picsState[pic] = state;
    }
  }

  state(i) {
    return this.picsState[i];
  }

  changeStateFooter() {
    if (this.footerState === "hidden") {
      this.footerState = "visible";
    } else {
      this.footerState = "hidden";
    }
  }

}
