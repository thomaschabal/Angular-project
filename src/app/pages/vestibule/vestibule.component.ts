import { Component, OnInit } from '@angular/core';

import { routesAppFromRoot } from '../../Routes';
import { Router } from '@angular/router';

const CATEGORIES = [
  {
    type: 'VIDEO',
    route: routesAppFromRoot.videos,
    name: 'vestibule.movies'
  },
  {
    type: 'PHOTO',
    route: routesAppFromRoot.pics,
    name: 'vestibule.pics'
  }
];

@Component({
  selector: 'app-vestibule',
  templateUrl: './vestibule.component.html',
  styleUrls: ['./vestibule.component.scss']
})
export class VestibuleComponent implements OnInit {
  categories = CATEGORIES;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }

}
