import { Component, OnInit, OnDestroy } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.scss'],
  animations : [
    // Hover animation on the pictures
    trigger('picsTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('200ms') ] ),
    ]),
  ]
})
export class ModerationComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  pics: any[];
  rawPics: any[];
  clicked: boolean;

  // Index of the picture the user clicked on
  indexViewer: number;

  // Variables about the user and the current operations on the event
  isAdmin: boolean;

  // State of the pictures in moderation phase : true means the pic is going to be deleted
  allAcceptState = 'nothing';
  allDeletionState = 'nothing';
  validateState = []; // Accept
  delState = [];  // Delete

  // Animation variables
  picsState = ['visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible'];


  constructor(private galeriesService: GaleriesService,
              private activeRoute: ActivatedRoute,
              private httpService: HttpService) {
      this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(
        f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
      );
  }

  ngOnInit() {
    // Request of pictures of the event
    this.galeriesService.getModerationFiles()
    .subscribe(
      (res: { unaproved_files }) => { this.pics = res.unaproved_files;
                                      for (let pic = 0; pic < this.pics.length; pic++) {
                   // Load all the pictures
                   this.galeriesService.getFullImage(this.pics[pic]).subscribe(
                     (response: { base64 }) => {
                       this.rawPics[pic] = response.base64;
                       this.pics[pic] = { base64: response.base64 };
                       },
                     (error) => { console.error(error); }
                   );
                   // Define the state of all pictures as not going to be deleted
                   this.validateState.push(false);
                   this.delState.push(false);
                 }
               },
      (error) => { console.error(error); }
    );
    this.isAdmin = this.httpService.isAdmin;
  }

  public ngOnDestroy(): void {
      if (this.sub) { this.sub.unsubscribe(); }
    }


  // Delete the event, in the moderation phase
  acceptAllPics() {
    if (this.allAcceptState === 'nothing') {
      this.allAcceptState = 'nearly deleted';
      alert('Tu es sur le point de tout accepter. Clique une deuxième fois sur \'Tout accepter\' pour valider l\'action.');
    } else {
      /// A COMPLETER
    }
  }

  deleteAllPics() {
    if (this.allDeletionState === 'nothing') {
      this.allDeletionState = 'nearly deleted';
      alert('Tu es sur le point de tout supprimer. Clique une deuxième fois sur \'Tout supprimer\' pour valider l\'action.');
    } else {
      /// A COMPLETER
    }
  }


  // Tell if a picture is going to be accepted or not
  acceptState(i) {
    return this.validateState[i];
  }

  // Tell if a picture is going to be deleted or not
  deleteState(i) {
    return this.delState[i];
  }

  // Change the state of moderation of a picture
  acceptPic(i: number) {
    this.validateState[i] = !this.validateState[i];
  }

  deletePic(i: number) {
    this.delState[i] = !this.delState[i];
  }

  // Validate the deletion of selected pictures
  acceptSelectedPics() {
    for (let pic = 0; pic < this.validateState.length; pic++) {
      if (this.validateState[pic]) {
        console.log(this.pics[pic].file_path);
        /// A COMPLETER
      }
    }
  }

  deleteSelectedPics() {
    for (let pic = 0; pic < this.delState.length; pic++) {
      if (this.delState[pic]) {
        console.log(this.pics[pic].file_path);
        /// A COMPLETER
      }
    }
  }


  // Image viewer activated on click
  onClick(iSelectedPic) {
    this.rawPics = [];
    this.indexViewer = iSelectedPic;

    // Get the full images, then store them and display
    for (let i = 0; i < this.pics.length; i++) {
      this.galeriesService.getFullImage(this.pics[i].file_path)
      .subscribe(
        (res: { base64 }) => { this.rawPics[i] = (res.base64); },
        (error) => { console.error(error); }
      );
    }
    this.clicked = true;
}



  //// HOVER ANIMATIONS
  survolePics(currentState: string) {
    for (let pic = 0; pic < this.picsState.length; pic++) {
      this.picsState[pic] = currentState;
    }
  }

  state(i) {
    return this.picsState[i];
  }



  // adapter = new DemoFilePickerAdapter(this.httpService);

}
