import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger, query } from '@angular/animations';

import { AuthService } from './services/auth.service';
import { BreakpointsService } from './services/breakpoints.service';
import { routesAppFromRoot } from './Routes';
import { environment } from '../environments/environment';

const REDIRECTIONS = {
  upont: 'https://upont.enpc.fr',
  facebook: 'https://www.facebook.com',
  useless: 'https://theuselessweb.com',
  sitedesponts: 'https://www.enpc.fr',
  pageblanche: 'https://hyris.tv/video/3886',
  github: 'https://github.com/ENPC-Ponthe/Angular-project',
  tartine: 'https://www.youtube.com/watch?v=iLE1qaQBjxA',
  slack: 'https://ponthe.slack.com',
  trello: 'https://trello.com/b/WIQhzGmu/ev%C3%A8nements-et-communication',
  logoponthe: environment.baseUrl + '/assets/images/logo-ponthe.svg',
  logoponthé: environment.baseUrl + '/assets/images/logo-ponthe.svg'
};
const SHOW_EASTER_EGG = {
  ponthe: 'Merci le Ponthéééé !!! On t\'aime <3 Bisous <3',
  ponthé: 'Merci le Ponthéééé !!! On t\'aime <3 Bisous <3',
  foyer: 'Foyer daubé !',
  42: 'Bonne réponse !'
};
const SHORTCUTS = {
  home: [routesAppFromRoot.home],
  pics: [routesAppFromRoot.galeries],
  crush: [routesAppFromRoot.crush],
  dashboard: [routesAppFromRoot.dashboard],
  membres: [routesAppFromRoot.members],
  members: [routesAppFromRoot.members],
  matos: [routesAppFromRoot.material],
  moderation: [routesAppFromRoot.moderation],
  modération: [routesAppFromRoot.moderation]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Page transition : fade to white
    trigger('routeAnimations', [
      transition('* => *', [
        query(':enter', style({ opacity : 0}), { optional: true }),
        query(':leave', [
          animate('0.5s', style({ opacity : 0}))
        ], { optional: true }),
        query(':enter', [
          animate('1.5s', style({ opacity : 1}))
        ], { optional: true }),
      ])
    ])
  ]
})

export class AppComponent {
  // Easter egg for redirection
  keys = '';
  titleEasterEgg = '';
  visible = false;

  constructor(private authService: AuthService,
              private breakpointsService: BreakpointsService,
              private router: Router) {
  }

  // Function for page transitions
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  // Breakpoints
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.breakpointsService.onResize(event);
  }

  showEasterEgg(phrase: string) {
    this.titleEasterEgg = phrase;
    this.keys = '';
    this.visible = true;
  }
  closeEasterEgg() {
    this.visible = false;
  }
  redirectEasterEgg(redirection: string[]) {
    this.router.navigate(redirection);
    this.keys = '';
  }

  // Easter egg
  @HostListener('window:keyup', ['$event'])
  keyPressed(event: KeyboardEvent) {
    if (event.key !== 'Shift' && event.key !== 'CapsLock') {
      this.keys += event.key;
      this.keys = this.keys.toLowerCase();
    }
    for (const key of Object.keys(REDIRECTIONS)) {
      if (this.keys.search(key) !== -1) {
        window.location.href = REDIRECTIONS[key];
      }
    }
    for (const key of Object.keys(SHOW_EASTER_EGG)) {
      if (this.keys.search(key) !== -1) {
        this.showEasterEgg(SHOW_EASTER_EGG[key]);
      }
    }
    for (const key of Object.keys(SHORTCUTS)) {
      if (this.keys.search(key) !== -1) {
        this.redirectEasterEgg(SHORTCUTS[key]);
      }
    }

    if (this.keys.search('logout') !== -1) {
      this.authService.signOut();
      this.redirectEasterEgg([routesAppFromRoot.auth]);
    }
  }
}
