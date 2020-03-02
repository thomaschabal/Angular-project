import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { state, trigger, animate, style, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GaleriesService } from '../../services/galeries.service';
import { HttpService } from '../../services/http.service';
import { PicsService } from '../../services/pics.service';
import KEY_CODE from '../../constants/KeyCode';
import { BREAKPOINTS } from '../../constants/Breakpoints';
import { pontheSpinnerAnimation } from 'src/app/constants/Animations';
import { ReactionsService } from 'src/app/services/reactions.service';
import { GetImagesResponse } from 'src/app/types/pics.types';

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
    pontheSpinnerAnimation
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
  moderationState: boolean[] = [];
  enModeration = false;

  // Animation variables
  picsState = Array(9).fill('visible');


  constructor(private galeriesService: GaleriesService,
              private activeRoute: ActivatedRoute,
              public httpService: HttpService,
              public picsService: PicsService,
              public reactionsService: ReactionsService) {
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
      (res: GetImagesResponse) => {
        const { files, number_of_files, gallery } = res;
        this.picsService.pics = files;
        this.picsService.numberOfPics = number_of_files;
        this.picsService.initRawPics(number_of_files);
        this.name = gallery.name;
        this.resume = gallery.description;
        // Define the state of all pictures as not going to be deleted
        this.moderationState = Array(number_of_files).fill(false);
        setTimeout(() => { this.displaySpinner = false; }, 200);
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

      const THRESHOLD = (window.innerWidth < BREAKPOINTS.SMALL) ? 14 : 4;
      // Load more pics when there are 4 lines of pics remaining before the end of the current page
      if (boundaryTop - THRESHOLD * articleHeight < window.innerHeight) {
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

  closePic() {
    this.picClicked = false;
    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('event-panel').style.display = 'block';
    document.getElementById('main').style.filter = 'none';
    document.getElementById('footer').style.display = 'block';
  }
}
