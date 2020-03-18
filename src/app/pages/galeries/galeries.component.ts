import { Component, OnInit, HostListener } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';

import { GaleriesService } from '../../services/galeries.service';
import { routesAppFromRoot } from '../../Routes';
import { BREAKPOINTS } from 'src/app/constants/Breakpoints';
import { pontheSpinnerAnimation } from 'src/app/constants/Animations';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss'],
  animations : [
    // Hover animation
    trigger('galeriesTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('200ms') ] ),
    ]),
    pontheSpinnerAnimation
  ]
})

export class GaleriesComponent implements OnInit {

  routes = routesAppFromRoot;

  // Loading Spinner
  displaySpinner = true;

  // Animation variables for 9 first pics
  galeriesState = Array(9).fill('visible');

  constructor(public galeriesService: GaleriesService) { }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.displaySpinner = this.galeriesService.displaySpinner;
    this.galeriesService.loadEvents().then(
      () => {
      setTimeout(() => { this.displaySpinner = this.galeriesService.displaySpinner; }, 300);
    });
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
        this.galeriesService.loadMoreEvents();
      }
    }

  // Display functions (hover and state)
  survoleGaleries(stateGaleries: string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = stateGaleries;
    }
  }
}
