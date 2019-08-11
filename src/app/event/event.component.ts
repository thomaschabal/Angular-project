import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { GaleriesFooterComponent } from '../galeries-footer/galeries-footer.component';
import { UploadComponent } from '../upload/upload.component';
import { GaleriesModerationButtonsComponent } from '../galeries-moderation-buttons/galeries-moderation-buttons.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { GaleriesService } from '../services/galeries.service';
import { HttpService } from '../services/http.service';
import { PicsService } from '../services/pics.service';

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
    trigger('spinnerTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('200ms') ] ),
    ])
  ]
})

export class EventComponent implements OnInit, OnDestroy {

  constructor(private galeriesService: GaleriesService,
              private activeRoute: ActivatedRoute,
              private httpService: HttpService,
              private picsService: PicsService) {
    this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(
      f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
    );
  }

  // Loading Spinner
  displaySpinner = true;
  stateSpinner = 'visible';

  private sub: Subscription;

  adresse: string;
  pics: any[];

  // About the event
  name: string;
  resume: string;

  // Index of the picture the user clicked on
  indexViewer: number;
  picClicked = false;

  // Variables about the user and the current operations on the event
  isAdmin: boolean;
  isPublic = false;
  selectedRoute: string;

  // State of the pictures in moderation phase : true means the pic is going to be deleted
  moderationState = [];

  // Animation variables
  picsState = ['visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible'];

  ngOnInit() {
    const selectedRoute = this.activeRoute.snapshot.params.event;
    this.httpService.currentGallery = selectedRoute;
    this.picsService.onChangeCurrentGallery(selectedRoute);
    this.selectedRoute = selectedRoute;
    // Request of pictures of the event
    this.galeriesService.getEventByName(selectedRoute)
    .subscribe(
      (res: {files, gallery}) => {
        this.pics = res.files;
        this.picsService.pics = res.files;
        this.picsService.initRawPics();
        const gallery = res.gallery;
        this.name = gallery.name;
        this.resume = gallery.description;
        // Define the state of all pictures as not going to be deleted
        for (const pic of res.files) {
          this.moderationState.push(false);
          this.stateSpinner = 'hidden';
          setTimeout(() => { this.displaySpinner = false; }, 200);
        }
      },
      (error) => { }
    );
    this.adresse = this.activeRoute.snapshot.routeConfig.path;
    this.isAdmin = this.httpService.isAdmin;
    this.isPublic = this.galeriesService.isPublicOrPrivate(this.selectedRoute);
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
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

  //// HOVER ANIMATIONS
  survolePics(statePic: string) {
    for (let pic of this.picsState) {
      pic = statePic;
    }
  }

  state(i) {
    return this.picsState[i];
  }

  onClickPic(iSelectedPic: number) {
    this.indexViewer = iSelectedPic;
    this.picClicked = true;
    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    document.getElementById('event-panel').style.display = 'none';
    // document.getElementById('moderation').style.filter = 'blur(8px)';
    document.getElementById('main').style.filter = 'blur(8px)';
    document.getElementById('footer').style.display = 'none';
  }

  closePic(shutPic: boolean) {
    this.picClicked = false;
    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('event-panel').style.display = 'block';
    // document.getElementById('moderation').style.filter = 'none';
    document.getElementById('main').style.filter = 'none';
    document.getElementById('footer').style.display = 'block';
  }
}
