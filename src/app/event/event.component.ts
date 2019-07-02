import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { MessagesService } from '../services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { HttpService } from '../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FilePickerComponent, ValidationError, FilePreviewModel } from 'ngx-awesome-uploader';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';




export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

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
    trigger('widePicsAnimation', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('*=>*', [ animate('200ms') ] ),
    ]),
  ]
})


export class EventComponent implements OnInit, OnDestroy {


  constructor(private galeriesService: GaleriesService,
              private messagesService: MessagesService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient) {
    this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(
      f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
    );
  }

  private sub: Subscription;

  adresse: string;
  pics: any[];
  rawPics = [];
  clicked: boolean;

  // About the event
  name: string;
  resume: string;

  // Index of the picture the user clicked on
  indexViewer: number;

  picClicked = false;
  widePicRef: any;
  captionWidePic: string;
  indexPicture = 0;

  // Variables about the user and the current operations on the event
  isAdmin: boolean;
  isPublic = false;
  enModeration = false;
  selectedRoute: string;
  clickAddFiles = false;

  // State of the pictures in moderation phase : true means the pic is going to be deleted
  eventDeletionState = 'nothing';
  moderationState = [];

  // Contact form defined here
  messageForm: FormGroup;

  // Animation variables
  picsState = ['visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible'];
  footerState = 'hidden';

  showArrows = true;





  // FILE UPLOAD

  @ViewChild('uploader') uploader: FilePickerComponent;
  adapter = new DemoFilePickerAdapter(this.httpClient, this.httpService);
  myFiles: FilePreviewModel[] = [];

  ngOnInit() {
    const selectedRoute = this.activeRoute.snapshot.params.event;
    this.httpService.currentGallery = selectedRoute;
    // Request of pictures of the event
    this.galeriesService.getEventByName(selectedRoute)
    .subscribe(
      (res: {files, gallery}) => { this.pics = res.files;
                                   const gallery = res.gallery;
                                   this.name = gallery.name;
                                   this.resume = gallery.description;
                 // Define the state of all pictures as not going to be deleted
                                   for (const pic of res.files) {
                   this.moderationState.push(false);
                 }
               },
      (error) => { console.error(error); }
    );
    this.adresse = this.activeRoute.snapshot.routeConfig.path;
    this.initForm();
    this.isAdmin = this.httpService.isAdmin;

    // Determine whether the gallery is public or private
    this.galeriesService.getPrivateEvents().subscribe(
      (res: {galleries}) => {
        // Ask for the list of all private galleries, and if the event is not in this list then it is a public event
        let isPublic = true;
        const liste = res.galleries;
        for (const event of liste) {
          if (event.slug === this.selectedRoute) {
            isPublic = false;
          }
        }
        this.isPublic = isPublic;
      }
    );
  }

  public ngOnDestroy(): void {
      if (this.sub) {
        this.sub.unsubscribe();
      }
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
      (res) => { alert('Message envoyé !'); },
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
      this.galeriesService.makePrivate(this.selectedRoute)
      .subscribe(
        (res) => { this.isPublic = !this.isPublic; }
      );
    } else {
      this.galeriesService.makePublic(this.selectedRoute)
      .subscribe(
        (res) => { this.isPublic = !this.isPublic; }
      );
    }
  }

  // Delete the event, in the moderation phase
  deleteEvent() {
    if (this.eventDeletionState === 'nothing') {
      this.eventDeletionState = 'nearly deleted';
      alert('Cette galerie est sur le point d\'être supprimée. Cliquer une ' +
        'deuxième fois sur \'Supprimer la galerie\' pour valider l\'action.');
    } else {
      this.galeriesService.deleteEvent(this.selectedRoute).subscribe(
        (res) => { alert('La galerie a bien été supprimée.'); this.router.navigate(['/galeries']); },
        (error) => { console.error(error); }
      );
    }
  }


  // Tell if a picture is going to be deleted or not
  deleteState(i) {
    return this.moderationState[i];
  }

  // Change the state of moderation of a picture
  moderePic(i: number) {
    this.moderationState[i] = !this.moderationState[i];
  }

  // Validate the deletion of selected pictures
  validateDeletionPics() {
    for (let pic = 0; pic < this.moderationState.length; pic++) {
      if (this.moderationState[pic]) {
        console.log(this.pics[pic].file_path);  // FIXME: replace with real request to the api
      }
    }
  }

  // Reveal the file uploader
  prepareAddFiles() {
    this.clickAddFiles = !this.clickAddFiles;
  }


  // Image viewer activated on click
  onClick(iSelectedPic) {
    this.rawPics = [];
    this.indexViewer = iSelectedPic;

    // Get the full images, then store them and display
    for (let i = 0; i < this.pics.length; i++) {
      this.galeriesService.getFullImage(this.pics[i].file_path)
      .subscribe(
        (res: {base64}) => { this.rawPics[i] = (res.base64); },
        (error) => { console.error(error); }
      );
    }
    this.clicked = true;
}



  //// HOVER ANIMATIONS
  survolePics(currentState: string) {
    for (let pic of this.picsState) {
      pic = currentState;
    }
  }

  state(i) {
    return this.picsState[i];
  }

  changeStateFooter() {
    if (this.footerState === 'hidden') {
      this.footerState = 'visible';
    } else {
      this.footerState = 'hidden';
    }
  }

  onValidationError(e: ValidationError) {
    console.log(e);
  }
  onUploadSuccess(e: FilePreviewModel) {
   console.log(e);
   console.log(this.myFiles);
  }
  onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }
  onFileAdded(file: FilePreviewModel) {
    this.myFiles.push(file);
  }
  removeFile() {
  this.uploader.removeFileFromList(this.myFiles[0].fileName);
  }


  uploadFilesToServer() {
    console.log(this.myFiles);
    for (const file of this.myFiles) {
      const form = new FormData();
      form.append('file', file.file);
      this.httpService.postFiles('/file-upload/' + this.selectedRoute, form)
      .subscribe(
        (res) => { console.log(res); },
        (error) => { console.error(error); }
      );
    }
  }








  onClickFavPic(iSelectedPic: number) {
    this.indexViewer = iSelectedPic;

    if (this.rawPics.length === 0) {
      // Get the full images, then store them and display
      for (let i = iSelectedPic; i < this.pics.length; i++) {
        this.galeriesService.getFullImage(this.pics[i].file_path)
        .subscribe(
          (res: { base64 }) => {
            this.rawPics[i] = (res.base64);
            if (i === iSelectedPic) {
              this.picClicked = true;
              this.widePicRef = this.rawPics[iSelectedPic];
              this.captionWidePic = this.name;
              this.indexPicture = iSelectedPic;
          }
         },
          (error) => { console.error(error); }
        );
      }
      for (let i = 0; i < iSelectedPic; i++) {
        this.galeriesService.getFullImage(this.pics[i].file_path)
        .subscribe(
          (res: { base64 }) => { this.rawPics[i] = (res.base64); },
          (error) => { console.error(error); }
        );
      }
    } else {
      this.widePicRef = this.rawPics[iSelectedPic];
      this.picClicked = true;
      this.indexPicture = iSelectedPic;
    }

    this.clicked = true;

    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    document.getElementById('event-panel').style.display = 'none';
    document.getElementById('moderation').style.filter = 'blur(8px)';
    document.getElementById('main').style.filter = 'blur(8px)';
    document.getElementById('footer').style.display = 'none';
  }


  closeWidePic() {
    this.picClicked = false;
    this.widePicRef = null;
    this.indexPicture = null;

    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('event-panel').style.display = 'block';
    document.getElementById('moderation').style.filter = 'none';
    document.getElementById('main').style.filter = 'none';
    document.getElementById('footer').style.display = 'block';
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
      this.indexPicture += this.rawPics.length;
    }
    this.widePicRef = this.rawPics[this.indexPicture];
    // document.getElementById('wide-pic').style.marginLeft.px=this.placePicLeft(imgWide);
  }

  navRight() {
    this.indexPicture = (this.indexPicture + 1) % (this.rawPics.length);
    this.widePicRef = this.rawPics[this.indexPicture];
  }

  // Show or hide arrows for the enlarged pics when hovered
  displayArrows() {
    this.showArrows = true;
  }

  hideArrows() {
    this.showArrows = false;
  }

  placePicLeft(img) {
    return ( (window.innerWidth - img.clientWidth) / 2 );
  }

  placePicTop(img) {
    return ( (window.innerHeight - img.clientHeight) / 2 );
  }

}
