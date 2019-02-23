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
    // Request for getting all the public galeries
    this.galeriesService.getAllEvents()
    .subscribe(
      (res) => {
        this.galeries_events = res["galleries"];
      },
      (error) => { console.error(error); }
    );

    // If the user is an admin, private galleries are loaded and then displayed
    if (this.httpService.isAdmin === true) {
      this.galeriesService.getPrivateEvents()
      .subscribe(
        (res) => { this.private_events = res["galleries"]; },
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
