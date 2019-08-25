import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';
import { GalleryCreationFormComponent } from '../../components/gallery-creation-form/gallery-creation-form.component';
import { NavigationButtonComponent } from '../../components/navigation-button/navigation-button.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  phrases = Phrases;
  buttonLinks = [
    { name: this.phrases['dashboard.links.slack'], address: 'https://ponthe.slack.com/messages' },
    { name: this.phrases['dashboard.links.trello'], address: 'https://trello.com/b/WIQhzGmu/ev%C3%A8nements-et-communication' },
    { name: this.phrases['dashboard.links.youtube'], address: 'https://www.youtube.com/channel/UCxHf0yHnEezkhuhzuT2yaIg' },
  ];

  // Create gallery form initially hidden
  eventCreationSelect = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  // On click on button "Modérer"
  navigateToModeration() {
    this.router.navigate([routesAppFromRoot.moderation]);
  }

  // Create gallery form visibility
  formVisibility() {
    this.eventCreationSelect = !this.eventCreationSelect;
  }
}
