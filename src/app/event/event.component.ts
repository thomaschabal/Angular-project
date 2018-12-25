import { Component, OnInit } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  name : string;
  pics : any[];
  resume : string;

  constructor(private galeriesService : GaleriesService) { }

  ngOnInit() {
    this.name = this.galeriesService.event_pics[5].name;
    this.pics = this.galeriesService.event_pics[5].pics;
    this.resume = this.galeriesService.event_pics[5].resume;
  }

}
