import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';
import { GalleryCreationFormComponent } from '../../components/gallery-creation-form/gallery-creation-form.component';
import { NavigationButtonComponent } from '../../components/navigation-button/navigation-button.component';

const BUTTON_LINKS = [
  { name: Phrases['dashboard.links.slack'],
    address: 'https://ponthe.slack.com/messages',
    class: 'fa-slack',
  },
  { name: Phrases['dashboard.links.trello'],
    address: 'https://trello.com/b/WIQhzGmu/ev%C3%A8nements-et-communication',
    class: 'fa-trello',
  },
  { name: Phrases['dashboard.links.youtube'],
    address: 'https://www.youtube.com/channel/UCxHf0yHnEezkhuhzuT2yaIg',
    class: 'fa-youtube',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  buttonLinks = BUTTON_LINKS;

  constructor(private router: Router) { }

  ngOnInit() { }

  // On click on button "Modérer"
  navigateToModeration() {
    this.router.navigate([routesAppFromRoot.moderation]);
  }
}
