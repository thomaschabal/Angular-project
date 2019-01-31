import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate, state } from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations : [
    trigger('buttonTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('150ms') ] ),
    ])
  ]
})
export class DashboardComponent implements OnInit {

  adminState = "hidden";
  filesState = "hidden";

  constructor() { }

  ngOnInit() {
  }

  survoleAdmin(state : string) {
    this.adminState = state;
  }

  survoleFiles(state : string) {
    this.filesState = state;
  }

}
