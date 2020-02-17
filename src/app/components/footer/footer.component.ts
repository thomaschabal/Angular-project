import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { HttpService } from '../../services/http.service';
import { routesApp } from 'src/app/Routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  get isOnline() {
    return (
      (this.httpService.token !== null) &&
      !(this.router.url.includes(routesApp.galeries)) &&
      !(this.router.url.includes(routesApp.dashboard)) &&
      !(this.router.url.includes(routesApp.reset)) &&
      !(this.router.url.includes(routesApp.auth)) &&
      !(this.router.url.includes(routesApp.newAccount))
    );
  }
}
