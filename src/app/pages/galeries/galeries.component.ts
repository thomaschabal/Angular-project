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
  stateSpinner = 'visible';

  // List of events to display
  galeriesEvents = [];
  privateEvents = [];

  // Animation variables for 9 first pics
  galeriesState = ['visible', 'visible', 'visible',
                   'visible', 'visible', 'visible',
                   'visible', 'visible', 'visible'];

  constructor(private galeriesService: GaleriesService) {
  }

  ngOnInit() {
    this.displaySpinner = this.galeriesService.displaySpinner;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.galeriesService.loadEvents().then(
      () => {
      this.privateEvents = this.galeriesService.privateEvents;
      this.galeriesEvents = this.galeriesService.galeriesEvents;
      this.stateSpinner = this.galeriesService.stateSpinner;
      setTimeout(() => { this.displaySpinner = this.galeriesService.displaySpinner; }, 200);
    });

  }


  // Display functions (hover and state)
  survoleGaleries(stateGaleries: string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = stateGaleries;
    }
  }

  state(i) {
    return this.galeriesState[i];
  }
}
