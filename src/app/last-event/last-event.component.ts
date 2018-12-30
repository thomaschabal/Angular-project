import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-event',
  templateUrl: './last-event.component.html',
  styleUrls: ['./last-event.component.scss']
})
export class LastEventComponent implements OnInit {

  @Input() event_id : string;
  @Input() routing : string;
  @Input() name : string;
  @Input() resume : string;
  @Input() next_event_id : string;
  @Input() index_placement : number;


  constructor() { }

  ngOnInit() {
  }

  placement() {
    if (this.index_placement%2 === 0) {
      return "right";
    } else {
      return "left";
    }
  }

  scroll(el) {
    el.scrollIntoView();
  }

}
