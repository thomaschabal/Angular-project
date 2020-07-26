import { Component, OnInit } from '@angular/core';

import { VideoService } from '@src/app/services/video.service';
import { pontheSpinnerAnimation } from '@src/app/constants/Animations';
import { routesAppFromRoot } from '@src/app/Routes';

@Component({
  selector: 'app-filmography',
  templateUrl: './filmography.component.html',
  styleUrls: ['./filmography.component.scss'],
  animations : [
    pontheSpinnerAnimation
  ]
})
export class FilmographyComponent implements OnInit {
  routes = routesAppFromRoot;

  constructor(public videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.loadFirstFilmography();
  }

  get reloadFunction() {
    return () => this.videoService.loadMoreFilmography();
  }
}
