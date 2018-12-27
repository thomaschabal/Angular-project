import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-photo',
  templateUrl: './event-photo.component.html',
  styleUrls: ['./event-photo.component.scss']
})
export class EventPhotoComponent implements OnInit {

  @Input() adresse : string;
  @Input() event : string;

  constructor() { }

  ngOnInit() {
    console.log(this.adresse);
  }

}
