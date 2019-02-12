import { Component, OnInit } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { state, trigger, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss'],
  animations : [
    trigger('galeriesTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('200ms') ] ),
    ])
  ]
})
export class GaleriesComponent implements OnInit {

  galeries_events : any[];

  galeriesState = ["visible", "visible", "visible", "visible", "visible", "visible", "visible", "visible", "visible"];

  constructor(private galeriesService : GaleriesService) { };

  ngOnInit() {
    this.galeries_events = this.galeriesService.galeries_events;
  }

  survoleGaleries(state : string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = state;
    }
  }

  state(i) {
    return this.galeriesState[i];
  }

}
