import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { state, trigger, animate, style, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GaleriesService } from '@src/app/services/galeries.service';
import { HttpService } from '@src/app/services/http.service';
import { PicsService } from '@src/app/services/pics.service';
import { pontheSpinnerAnimation } from '@src/app/constants/Animations';
import { ReactionsService } from '@src/app/services/reactions.service';
import { GetImagesResponse } from '@src/app/types/pics.types';

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
    // this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(
    //   f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
    // );
  }

  ngOnInit() {
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

  get reloadFunction() {
    return () => this.picsService.loadMorePics();
  }

  activateUploadArea() {
    this.showUploadArea = true;
  }
  hideUploadArea() {
    this.showUploadArea = false;
  }

  modere() {
    this.enModeration = !this.enModeration;
  }

  // Change the state of moderation of a picture
  moderePic(i: number) {
    this.moderationState[i] = !this.moderationState[i];
  }

  onClickPic(iSelectedPic: number) {
    this.indexViewer = iSelectedPic;
    this.picClicked = true;
    // Have a blurred background when the image viewer is active
    // document.getElementById('header').style.display = 'none';
    // document.getElementById('event-panel').style.display = 'none';
    // document.getElementById('main').style.filter = 'blur(8px)';
    // document.getElementById('footer').style.display = 'none';
  }

  closePic() {
    this.picClicked = false;
    // Remove the blurred background
    // document.getElementById('header').style.display = 'block';
    // document.getElementById('event-panel').style.display = 'block';
    // document.getElementById('main').style.filter = 'none';
    // document.getElementById('footer').style.display = 'block';
  }
}
