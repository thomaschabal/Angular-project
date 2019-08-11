import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FilePickerComponent, ValidationError, FilePreviewModel } from 'ngx-awesome-uploader';
import { Plyr } from 'plyr';
import { PlyrComponent } from 'ngx-plyr';

import { GaleriesService } from '../services/galeries.service';
import { MessagesService } from '../services/messages.service';
import { HttpService } from '../services/http.service';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { Phrases } from '../Phrases';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  animations : [
    // Display the footer
    trigger('footerTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(2vh)'})),
      state('hidden', style({opacity : 0})),
      transition('* => *', [ animate('200ms') ] ),
    ]),
    trigger('spinnerTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('200ms') ] ),
    ])
  ]
})

export class VideoComponent implements OnInit, OnDestroy {

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

  // Loading Spinner
  displaySpinner = true;
  stateSpinner = 'visible';

  private sub: Subscription;

  adresse: string;

  // About the film
  name: string;
  resume: string;
  filmBackground: string;
  footerState = 'hidden';

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

  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  player: Plyr;

  videoSources: Plyr.Source[] = [
    {
      src: 'bTqVqk7FSmY',
      provider: 'youtube',
    },
  ];

  // FILE UPLOAD
  @ViewChild('uploader') uploader: FilePickerComponent;
  adapter = new DemoFilePickerAdapter(this.httpClient, this.httpService);
  myFiles: FilePreviewModel[] = [];

  ngOnInit() {
    const selectedRoute = this.activeRoute.snapshot.params.event;
    this.httpService.currentGallery = selectedRoute;
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

    // MOCK VALUES, FOR DEVELOPMENT
    this.displaySpinner = false;
    this.name = 'Vidéo de test';
    this.resume = 'Ceci est une galerie de tests.';
    this.filmBackground = 'assets/images/font1.jpg';
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
      (res) => { alert(Phrases['messages.sent']); },
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
      alert(Phrases['event.deleteGallery.galleryWillBeDeleted']);
    } else {
      this.galeriesService.deleteEvent(this.selectedRoute).subscribe(
        (res) => {
          alert(Phrases['event.deleteGallery.galleryWasDeleted']);
          this.router.navigate(['/galeries']);
        },
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
        console.log();
      }
    }
  }

  // Reveal the file uploader
  prepareAddFiles() {
    this.clickAddFiles = !this.clickAddFiles;
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
      this.httpService.postFiles('/api/file-upload/' + this.selectedRoute, form)
      .subscribe(
        (res) => { console.log(res); },
        (error) => { console.error(error); }
      );
    }
  }

  changeStateFooter() {
    if (this.footerState === 'hidden') {
      this.footerState = 'visible';
    } else {
      this.footerState = 'hidden';
    }
  }
}
