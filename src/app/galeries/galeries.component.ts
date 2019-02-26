import { Component, OnInit } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { HttpService } from '../services/http.service'
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
  galeries_events : any[];
  private_events : any[];

  // Animation variables for 9 first pics
  galeriesState = ["visible", "visible", "visible", "visible", "visible", "visible", "visible", "visible", "visible"];

  constructor(private httpService : HttpService,
              private galeriesService : GaleriesService) {
  };

  ngOnInit() {

    // If the user is an admin, private galleries are loaded and then displayed
    if (this.httpService.isAdmin === true) {
      this.galeriesService.getPrivateEvents()
      .subscribe(
        (res) => { this.private_events = res["galleries"]; },
        (error) => { console.error(error); }
      );

      // Request for getting all the public galeries
      this.galeriesService.getAllEvents()
      .subscribe(
        (res) => {
          this.galeries_events = res["galleries"];
        },
        (error) => { console.error(error); }
      );
    }

    else {
      this.galeries_events = [];
      // Define the years regarding the user
      const user_prom1A = ( +("2" + this.httpService.promotion) -3) + "";
      const user_prom2A = ( +("2" + this.httpService.promotion) -2) + "";
      // Get the events of both years
      this.galeriesService.getEventsOfYear(user_prom1A).subscribe(
        (res) => {
          this.galeries_events = res["public_galleries"];
          this.galeriesService.getEventsOfYear(user_prom2A).subscribe(
            (response) => {
              this.galeries_events = this.galeries_events.concat(response["public_galleries"]);
              this.getImagesRestrictedGalleries();
            },
            (err) => { console.error(err); }
          );
        },
        (error) => {
          console.error(error);
          this.galeriesService.getEventsOfYear(user_prom2A).subscribe(
            (response) => {
              this.galeries_events = this.galeries_events.concat(response["public_galleries"]);
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
    for (let event=0; event<this.galeries_events.length; event++) {
      this.galeriesService.getImage(this.galeries_events[event])
      .subscribe(
        (res) => {
          const request_gallery = res["gallery"];
          const image = res["thumbnail"];
          this.galeries_events[event] = {
            "name": request_gallery["name"],
            "slug": request_gallery["slug"],
            "image": image
          };
        },
        (error) => { console.error(error); }
      );
    }

    // We do the same for private events for administrators
    for (let event=0; event<this.private_events.length; event++) {
      this.galeriesService.getImage(this.private_events[event])
      .subscribe(
        (res) => {
          const request_gallery = res["gallery"];
          const image = res["thumbnail"];
          this.galeries_events[event] = {
            "name": request_gallery["name"],
            "slug": request_gallery["slug"],
            "image": image
          };
        },
        (error) => { console.error(error); }
      );
    }
  }


  // Display functions (hover and state)
  survoleGaleries(state : string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = state;
    }
  }

  state(i) {
    return this.galeriesState[i];
  }

}
