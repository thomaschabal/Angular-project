import { Component, OnInit } from '@angular/core';

import { GaleriesService } from '../../../services/galeries.service';
import { routesAppFromRoot } from '../../../Routes';

@Component({
  selector: 'app-private-galleries',
  templateUrl: './private-galleries.component.html',
  styleUrls: ['./private-galleries.component.scss']
})
export class PrivateGalleriesComponent implements OnInit {
  routes = routesAppFromRoot;

  // Loading Spinner
  displaySpinner = true;

  // Animation variables for 9 first pics
  galeriesState = Array(9).fill('visible');

  constructor(public galeriesService: GaleriesService) { }

  ngOnInit(): void {
    this.galeriesService.loadPrivateEvents().then(
      () => {
      setTimeout(() => { this.displaySpinner = false; }, 200);
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
