import { Component, OnInit, OnDestroy } from '@angular/core';
import { state, trigger, animate, style, transition, keyframes } from '@angular/animations';

import { GaleriesService } from '../../services/galeries.service';
import { routesAppFromRoot } from '../../Routes';

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

  // Display functions (hover and state)
  survoleGaleries(stateGaleries: string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = stateGaleries;
    }
  }
}
