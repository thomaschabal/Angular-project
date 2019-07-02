import { Component, OnInit } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { HttpService } from '../services/http.service';
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
    ])
  ]
})
export class GaleriesComponent implements OnInit {

  // List of events to display
  galeriesEvents: any[];
  privateEvents: any[];

  // Animation variables for 9 first pics
  galeriesState = ['visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible'];

  constructor(private httpService: HttpService,
              private galeriesService: GaleriesService) {
  }

  ngOnInit() {
    // If the user is an admin, private galleries are loaded and then displayed
    if (this.httpService.isAdmin === true) {
      this.galeriesService.getPrivateEvents()
      .subscribe(
        (res: { galleries }) => { this.privateEvents = res.galleries; },
        (error) => { console.error(error); }
      );

      // Request for getting all the public galeries
      this.galeriesService.getAllEvents()
      .subscribe(
        (res: { galleries }) => {
          this.galeriesEvents = res.galleries;
        },
        (error) => { console.error(error); }
      );
    } else {
      this.galeriesEvents = [];
      // Define the years regarding the user
      const userProm1A = ( +('2' + this.httpService.promotion) - 3) + '';
      const userProm2A = ( +('2' + this.httpService.promotion) - 2) + '';
      // Get the events of both years
      this.galeriesService.getEventsOfYear(userProm1A).subscribe(
        (res: { public_galleries }) => {
          this.galeriesEvents = res.public_galleries;
          this.galeriesService.getEventsOfYear(userProm2A).subscribe(
            (response: { public_galleries }) => {
              this.galeriesEvents = this.galeriesEvents.concat(response.public_galleries);
              this.getImagesRestrictedGalleries();
            },
            (err) => { console.error(err); }
          );
        },
        (error) => {
          console.error(error);
          this.galeriesService.getEventsOfYear(userProm2A).subscribe(
            (response: { public_galleries }) => {
              this.galeriesEvents = this.galeriesEvents.concat(response.public_galleries);
              this.getImagesRestrictedGalleries();
            },
            (err) => { console.error(err); }
          );
        }
      );
    }
  }

  getImagesRestrictedGalleries() {
    // Only the slugs of the events are currently stored.
    // We therefore look for thumbnails and names
    for (let event = 0; event < this.galeriesEvents.length; event++) {
      this.galeriesService.getImage(this.galeriesEvents[event])
      .subscribe(
        (res: { gallery, thumbnail }) => {
          const requestGallery = res.gallery;
          const thumbnail = res.thumbnail;
          this.galeriesEvents[event] = {
            name: requestGallery.name,
            slug: requestGallery.slug,
            image: thumbnail
          };
        },
        (error) => { console.error(error); }
      );
    }

    // We do the same for private events for administrators
    for (let event = 0; event < this.privateEvents.length; event++) {
      this.galeriesService.getImage(this.privateEvents[event])
      .subscribe(
        (res: { gallery, thumbnail }) => {
          const requestGallery = res.gallery;
          const thumbnail = res.thumbnail;
          this.galeriesEvents[event] = {
            name: requestGallery.name,
            slug: requestGallery.slug,
            image: thumbnail
          };
        },
        (error) => { console.error(error); }
      );
    }
  }


  // Display functions (hover and state)
  survoleGaleries(currentState: string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = currentState;
    }
  }

  state(i) {
    return this.galeriesState[i];
  }

}
