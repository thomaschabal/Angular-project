import { Component, OnInit } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { HttpService } from '@src/app/services/http.service';
import { VideoService } from '@src/app/services/video.service';

import {registerElement} from 'nativescript-angular/element-registry';
import { Video } from 'nativescript-videoplayer';
registerElement("VideoPlayer", () => Video);

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  animations : [
    trigger('spinnerTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('200ms') ] ),
    ])
  ]
})

export class VideoComponent implements OnInit {

  constructor(public videoService: VideoService,
              public httpService: HttpService,
              private router: Router) {
  }

  // Loading Spinner
  displaySpinner = true;
  stateSpinner = 'visible';
  videoUrl = '';

  // About the film
  name: string;

  // State of the pictures in moderation phase : true means the pic is going to be deleted
  moderationState = [];

  ngOnInit() {
    const url = this.router.url.split('/');
    const videoGallerySlug = url[url.length - 1];
    this.videoService.setSelectedMovie(videoGallerySlug);

    this.videoService.getVideoData();

    this.videoUrl = this.videoService.videoUrls[2].url;
    // MOCK VALUES, FOR DEVELOPMENT
    this.displaySpinner = false;
  }
}
