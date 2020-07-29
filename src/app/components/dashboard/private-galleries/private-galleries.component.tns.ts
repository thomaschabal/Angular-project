import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GaleriesService } from '@src/app/services/galeries.service';
import { routesAppFromRoot } from '@src/app/Routes';

@Component({
  selector: 'app-private-galleries',
  templateUrl: './private-galleries.component.html',
  styleUrls: ['./private-galleries.component.scss']
})
export class PrivateGalleriesComponent implements OnInit {
  routes = routesAppFromRoot;

  // Loading Spinner
  displaySpinner = true;

  constructor(public galeriesService: GaleriesService,
              private router: Router) { }

  ngOnInit(): void {
    this.galeriesService.loadPrivateEvents().then(
      () => {
      setTimeout(() => { this.displaySpinner = false; }, 200);
    });
  }

  navigateToPrivateGallery(gallerySlug: string) {
    const galleryAddress = this.routes.pics + '/' + gallerySlug;
    this.router.navigate([galleryAddress]);
  }

  navigateToPrivateMovie(movieSlug: string) {
    const movieAddress = this.routes.videos + '/' + movieSlug;
    this.router.navigate([movieAddress]);
  }
}
