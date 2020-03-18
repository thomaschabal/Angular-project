import { Component, OnInit, HostListener } from '@angular/core';

import { VideoService } from 'src/app/services/video.service';
import { pontheSpinnerAnimation } from 'src/app/constants/Animations';
import { BREAKPOINTS } from 'src/app/constants/Breakpoints';
import { routesAppFromRoot } from 'src/app/Routes';

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
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.videoService.loadFirstFilmography();
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
        this.videoService.loadMoreFilmography();
      }
    }

}
