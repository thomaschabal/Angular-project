import { Component, HostListener } from '@angular/core';
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

  // Easter egg for redirection
  keys = "";

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

  // Easter egg
  @HostListener('window:keyup', ['$event'])
  keyPressed(event: KeyboardEvent) {
    if (event.key !== "Shift" && event.key !== "CapsLock") {
      this.keys += event.key;
      this.keys = this.keys.toLowerCase();
    }

    if (this.keys.search("logoponthe") !== -1 || this.keys.search("logoponthé") !== -1) {
      window.location.href = 'http://localhost:4200/assets/images/logo-ponthe.svg';
    }
    if (this.keys.search("ponthe") !== -1 || this.keys.search("ponthé") !== -1) {
      alert("Merci le Ponthéééé !!! On t'aime <3 Bisous <3");
      this.keys = "";
    }
    if (this.keys.search("facebook") !== -1) {
      window.location.href = 'https://www.facebook.com';
    }
    if (this.keys.search("upont") !== -1) {
      window.location.href = 'https://upont.enpc.fr';
    }
    if (this.keys.search("useless") !== -1) {
      window.location.href = 'https://theuselessweb.com';
    }
    if (this.keys.search("sitedesponts") !== -1) {
      window.location.href = 'https://www.enpc.fr';
    }
    if (this.keys.search("pageblanche") !== -1) {
      window.location.href = 'https://hyris.tv/video/3886';
    }
    if (this.keys.search("github") !== -1) {
      window.location.href = 'https://github.com/ENPC-Ponthe/Angular-project';
    }
    if (this.keys.search("foyer") !== -1) {
      alert("Foyer daubé !");
      this.keys = "";
    }
    if (this.keys.search("42") !== -1) {
      alert("Bonne réponse !");
      this.keys = "";
    }
    if (this.keys.search("tartine") !== -1) {
      window.location.href = 'https://www.youtube.com/watch?v=iLE1qaQBjxA';
    }


    // Shortcuts for administrators
    if (this.httpService.isAdmin) {
      if (this.keys.search("home") !== -1) {
        this.router.navigate(['/home']);
        this.keys = "";
      }
      if (this.keys.search("pics") !== -1) {
        this.router.navigate(['/galeries']);
        this.keys = "";
      }
      if (this.keys.search("dashboard") !== -1) {
        this.router.navigate(['/dashboard']);
        this.keys = "";
      }
      if (this.keys.search("membres") !== -1) {
        this.router.navigate(['/members']);
        this.keys = "";
      }
      if (this.keys.search("matos") !== -1) {
        this.router.navigate(['/material']);
        this.keys = "";
      }
      if (this.keys.search("moderation") !== -1) {
        this.router.navigate(['/moderation']);
        this.keys = "";
      }
      if (this.keys.search("logout") !== -1) {
        this.authService.signOut();
        this.router.navigate(['/auth']);
        this.keys = "";
      }
    }
  }

}
