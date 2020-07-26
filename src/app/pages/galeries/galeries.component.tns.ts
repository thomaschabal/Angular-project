import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GaleriesService } from '@src/app/services/galeries.service';
import { routesAppFromRoot } from '@src/app/Routes';
import { pontheSpinnerAnimation } from '@src/app/constants/Animations';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss'],
  animations : [
    pontheSpinnerAnimation
  ]
})

export class GaleriesComponent implements OnInit {
  routes = routesAppFromRoot;

  constructor(public galeriesService: GaleriesService,
              private router: Router) { }

  // Loading Spinner
  displaySpinner = true;

  ngOnInit() {
    this.displaySpinner = this.galeriesService.displaySpinner;
    this.galeriesService.loadEvents().then(
      () => {
      setTimeout(() => { this.displaySpinner = this.galeriesService.displaySpinner; }, 300);
    });
  }

  get reloadFunction() {
    return () => this.galeriesService.loadMoreEvents();
  }

  navigateToEvent(eventSlug: string) {
    const eventAddress = this.routes.pics + '/' + eventSlug;
    this.router.navigate([eventAddress]);
  }
}
