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

  constructor(public galeriesService: GaleriesService) { }

  ngOnInit(): void {
    this.galeriesService.loadPrivateEvents().then(
      () => {
      setTimeout(() => { this.displaySpinner = false; }, 200);
    });
  }

}
