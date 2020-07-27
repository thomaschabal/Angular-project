import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GaleriesService } from '@src/app/services/galeries.service';
import { routesAppFromRoot } from '@src/app/Routes';
import { pontheSpinnerAnimation } from '@src/app/constants/Animations';
// import { ImageSourceSVG } from 'nativescript-svg';

// const svgFile = new ImageSourceSVGModule.ImageSourceSVG();
// const path = '~/assets/images/logo-ponthe.svg';
// console.log('SVG', svgFile)
// const loaded = svgFile.loadFromFile(path);
// if(loaded){
//   console.log("object loaded");
// } else {
//   console.log("error");
// }

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
  // svgFile: any;

  constructor(public galeriesService: GaleriesService,
              private router: Router) { }

  // Loading Spinner
  displaySpinner = true;

  ngOnInit() {
    // const path = '~/assets/images/logo-ponthe.svg';
    // this.svgFile = new ImageSourceSVG()
    // this.svgFile.fromFile(path).then(loaded => console.log(loaded));
    // console.log(this.svgFile)
    // const loaded = svgFile.fromFile(path);
    // console.log('SVG', svgFile, loaded)

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
