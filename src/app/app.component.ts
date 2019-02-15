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

  authStatus: boolean;

  constructor(private authService : AuthService,
              private httpService : HttpService,
              private router : Router) {
                this.authStatus = false;
              }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = (this.authService.authStatus);
    this.router.navigate(['auth']);
  }

  isOnline() {
    console.log(this.authStatus);
    return (this.authStatus);
  }

  prepareRoute(outlet : RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  // fonction(){
  //   console.log("on a cliqué ici");
  //   let	$window = $(window),
  // 		$body = $('body');
  //
  //   // Play initial animations on page load.
	// 	$window.on('load', function() {
	// 		console.log("test interne");
	// 		setTimeout(function() {
	// 			$body.removeClass('is-preload');
	// 		}, 100);
	// 	});
  //
  //   $window.on('load', function() {
  //
	// 		let $gallery = $('.gallery');
  //
	// 		$gallery.poptrox({
	// 			baseZIndex: 10001,
	// 			useBodyOverflow: false,
	// 			usePopupEasyClose: false,
	// 			overlayColor: '#1f2328',
	// 			overlayOpacity: 0.65,
	// 			usePopupDefaultStyling: false,
	// 			usePopupCaption: true,
	// 			popupLoaderText: '',
	// 			windowMargin: 50,
	// 			usePopupNav: true
	// 		});
  //
  //   });
  // }
}
