import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { BUTTON_LINKS_ADMIN } from '@src/app/Constants';
// import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  buttonLinks = BUTTON_LINKS_ADMIN;
  openModeration = false;
  loadingModerationView = false;

  // constructor(private router: Router) { }
  constructor() { }

  ngOnInit() {
  }

  // On click on button "Modérer"
  displayModeration() {
    this.openModeration = !this.openModeration;
    this.loadingModerationView = this.openModeration;
  }

  moderationStarted() {
    console.log('view started')
    this.loadingModerationView = true;
  }

  moderationLoaded() {
    console.log('view loaded')
    this.loadingModerationView = false;
  }
}
