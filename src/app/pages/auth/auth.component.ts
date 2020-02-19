import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { PwaService } from '../../services/Pwa.service';
import { routesAppFromRoot } from '../../Routes';
import { BREAKPOINTS, PATH_AUTH_VIDEO, CAS_BASE_URL } from '../../Constants';
import { environment } from 'src/environments/environment';

const NULL_TICKET = [null, 'null', undefined];

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

    const currentLocation = new URL(window.location.href);
    const ticket = currentLocation.searchParams.get('ticket');
    if (NULL_TICKET.indexOf(ticket) === -1) {
      this.authService.casProcess(ticket);
    }

    this.initForm();
    this.getBreakpoint();
    this.ssoPath = environment.baseUrl + '/api/cas/login/'; // CAS_BASE_URL + encodeURI(environment.baseUrl + '/api/cas/login/');
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
