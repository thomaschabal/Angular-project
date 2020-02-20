import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Api from '../../services/Api';
import { AuthService } from '../../services/auth.service';
import { PwaService } from '../../services/Pwa.service';
import { routesAppFromRoot } from '../../Routes';
import { BREAKPOINTS, PATH_AUTH_VIDEO } from '../../Constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
  pathAuthVideo = PATH_AUTH_VIDEO;
  ssoPath: string;

  // Authentification form defined here
  userForm: FormGroup;
  routes = routesAppFromRoot;
  isMobileOrTablet: boolean;

  constructor(public authService: AuthService,
              public Pwa: PwaService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.initForm();
    this.getBreakpoint();
    this.ssoPath = environment.apiUrl + Api.casLogin;
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
    this.authService.loginError = false;
  }

  installPwa(): void {
    this.Pwa.installPwa();
  }
}
