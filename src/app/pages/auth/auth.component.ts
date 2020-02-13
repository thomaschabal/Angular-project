import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthFooterComponent } from '../../components/auth-footer/auth-footer.component';
import { routesAppFromRoot } from '../../Routes';
import { BREAKPOINTS, PATH_AUTH_VIDEO, CAS_BASE_URL } from '../../Constants';
import { Subscription } from 'rxjs';
import { PwaService } from '../../services/Pwa.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit, OnDestroy {
  pathAuthVideo = PATH_AUTH_VIDEO;
  ssoPath: string;

  // Authentification form defined here
  userForm: FormGroup;
  routes = routesAppFromRoot;
  isMobileOrTablet: boolean;

  isLoginErrorSubscription: Subscription;
  isLoginError = 'hidden';

  constructor(private authService: AuthService,
              public Pwa: PwaService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.initForm();
    this.getBreakpoint();

    this.isLoginErrorSubscription = this.authService.loginErrorStream.subscribe(state => {
      this.isLoginError = (state === true) ? 'visible' : 'hidden';
    });
    this.ssoPath = CAS_BASE_URL + encodeURI(location.origin + '/v1');
    console.log(this.ssoPath)
  }

  ngOnDestroy() {
    this.isLoginErrorSubscription.unsubscribe();
  }

  getBreakpoint() {
    this.isMobileOrTablet = window.innerWidth <= BREAKPOINTS.MEDIUM;
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    this.userForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  // Submission of the form
  onSignIn() {
    this.authService.signIn(this.userForm.value);
  }

  closeAlert() {
    this.authService.updateLoginError(false);
  }

  installPwa(): void {
    this.Pwa.installPwa();
  }
}
