import { Component, OnInit } from '@angular/core';

import { routesAppFromRoot } from '@src/app/Routes';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})

export class AuthNavComponent implements OnInit {
  routes = routesAppFromRoot;

  constructor() { }

  ngOnInit() { }
}
