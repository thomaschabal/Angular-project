import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { state, trigger, animate, style, transition, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GaleriesService } from '../../services/galeries.service';
import { HttpService } from '../../services/http.service';
import { PicsService } from '../../services/pics.service';
import KEY_CODE from '../../constants/KeyCode';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  animations : [
    // Hover animation on the pictures
    // trigger('picsTrigger', [
    //   state('visible', style({opacity: 1})),
    //   state('hidden', style({opacity: 0})),
    //   transition(':enter', [ animate('200ms') ] ),
    // ]),
    trigger('spinnerTrigger', [
      transition(':enter', [
        animate(200, keyframes([
          style({ offset: 0, opacity: 0 }),
          style({ offset: 1, opacity: 1 })
        ]))
      ]),
      transition(':leave', [
        animate(200, keyframes([
          style({ offset: 0, opacity: 1 }),
          style({ offset: 1, opacity: 0 })
        ]))
      ]),
    ])
  ]
})

export class EventComponent implements OnInit, OnDestroy {
  // Loading Spinner
  displaySpinner = true;

  private sub: Subscription;

  // About the event
  name: string;
  resume: string;

  // Index of the picture the user clicked on
  indexViewer: number;
  picClicked = false;

  // Variables about the user and the current operations on the event
  isPublic = false;
  selectedRoute: string;
  showUploadArea = false;

  // State of the pictures in moderation phase : true means the pic is going to be deleted
  moderationState = [];
  enModeration = false;

  // Animation variables
  picsState = Array(9).fill('visible');


  constructor(private galeriesService: GaleriesService,
              private activeRoute: ActivatedRoute,
              public httpService: HttpService,
              public picsService: PicsService) {
    this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(
      f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
    );
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.selectedRoute = this.activeRoute.snapshot.params.event;
    this.httpService.currentGallery = this.selectedRoute;
    this.picsService.onChangeCurrentGallery(this.selectedRoute);
    // Request of pictures of the event
    this.galeriesService.getEventByName(this.selectedRoute)
    .subscribe(
      (res: {files, number_of_files, gallery}) => {
        this.picsService.pics = res.files;
        this.picsService.numberOfPics = res.number_of_files;
        this.picsService.initRawPics(res.number_of_files);
        const gallery = res.gallery;
        this.name = gallery.name;
        this.resume = gallery.description;
        // Define the state of all pictures as not going to be deleted
        this.moderationState = Array(res.number_of_files).fill(false);
        setTimeout(() => { this.displaySpinner = false; }, 200);
        // this.picsService.updatePics();
      },
      (error) => { }
    );
    this.isPublic = this.galeriesService.isPublicOrPrivate(this.selectedRoute);
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
    scrollHandler() {
      const articles = document.getElementsByClassName('thumb');
      const articleHeight = articles[0].clientHeight;
      const boundary = articles[articles.length - 1];
      const boundaryTop = boundary.getBoundingClientRect().top;

      // Load more pics when there are 4 lines of pics remaining before the end of the current page
      if (boundaryTop - 4 * articleHeight < window.innerHeight) {
        this.picsService.loadMorePics();
      }
    }

  activateUploadArea() {
    this.showUploadArea = true;
  }
  hideUploadArea() {
    this.showUploadArea = false;
  }

  // Host Listener for the image viewer
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE && this.showUploadArea) {
      this.showUploadArea = false;
    }
  }

  modere() {
    this.enModeration = !this.enModeration;
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

  onClickPic(iSelectedPic: number) {
    this.indexViewer = iSelectedPic;
    this.picClicked = true;
    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    document.getElementById('event-panel').style.display = 'none';
    document.getElementById('main').style.filter = 'blur(8px)';
    document.getElementById('footer').style.display = 'none';
  }

  closePic(shutPic: boolean) {
    this.picClicked = false;
    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('event-panel').style.display = 'block';
    document.getElementById('main').style.filter = 'none';
    document.getElementById('footer').style.display = 'block';
  }
}
