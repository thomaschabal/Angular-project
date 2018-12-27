import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-galerie-events',
  templateUrl: './galerie-events.component.html',
  styleUrls: ['./galerie-events.component.scss']
})
export class GalerieEventsComponent implements OnInit {

  @Input() name : string;
  @Input() routing : string;
  @Input() image : string;

  constructor() { }

  ngOnInit() {
  }

}
