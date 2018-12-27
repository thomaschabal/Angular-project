import { Component, OnInit } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  name : string;
  pics : any[];
  resume : string;

  constructor(private galeriesService : GaleriesService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    const selected_route = this.route.snapshot.params['event'];
    this.name = this.galeriesService.getEventByName(selected_route).name;
    this.pics = this.galeriesService.getEventByName(selected_route).pics;
    this.resume = this.galeriesService.getEventByName(selected_route).resume;
  }

}
