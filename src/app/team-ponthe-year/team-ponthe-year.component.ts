import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-ponthe-year',
  templateUrl: './team-ponthe-year.component.html',
  styleUrls: ['./team-ponthe-year.component.scss']
})
export class TeamPontheYearComponent implements OnInit {

  @Input() year : string;
  @Input() year_id : string;
  @Input() members : string;
  @Input() prev_year_id : string;
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

}
