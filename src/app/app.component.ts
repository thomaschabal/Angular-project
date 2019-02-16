import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { Router, RouterOutlet } from '@angular/router';
import { animate, style, state, transition, trigger, query } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Page transition : fade to white
    trigger('routeAnimations', [
      transition('* => *', [
        query(':enter', style({ opacity : 0})),
        query(':leave', [
          animate('0.5s', style({ opacity : 0}))
        ]),
        query(':enter', [
          animate('1.5s', style({ opacity : 1}))
        ]),
      ])
    ])
  ]
})

export class AppComponent {
  title = 'Galeries Ponthé';

  // Status of the user : true = online, false = offline
  authStatus: boolean;

  constructor(private authService : AuthService,
              private httpService : HttpService,
              private router : Router) {
                // Initially, the user is redirected to the Auth page and is offline
                this.authStatus = this.authService.isAuth;
              }

  // Function for page transitions
  prepareRoute(outlet : RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
