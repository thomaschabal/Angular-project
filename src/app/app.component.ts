import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Galeries Ponthé';

  userAuth : boolean;
  authStatus: boolean;

  constructor(private authService : AuthService, private router : Router) { }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = (this.authService.token !== null);
    this.router.navigate(['auth']);
  }

  isOnline() {
    return (this.authService.token !== null);
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
