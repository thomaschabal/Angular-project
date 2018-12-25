import { Component, OnInit } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss']
})
export class GaleriesComponent implements OnInit {

  galeries_events : any[];

  constructor(private galeriesService : GaleriesService) { };

  ngOnInit() {
    this.galeries_events = this.galeriesService.galeries_events;
  }

}
