import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Api from '@src/app/services/Api';
import { AuthService } from '@src/app/services/auth.service';
import { PwaService } from '@src/app/services/Pwa.service';
import { routesAppFromRoot } from '@src/app/Routes';
import { PATH_AUTH_VIDEO, PATH_AUTH_PHOTO } from '@src/app/Constants';
import { environment } from '@src/environments/environment';
import { Video } from 'nativescript-videoplayer';
import {registerElement} from 'nativescript-angular/element-registry';
registerElement("VideoPlayer", () => Video);

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
  pathAuthVideo = PATH_AUTH_VIDEO;
  pathAuthPhoto = PATH_AUTH_PHOTO;
  ssoPath: string;

  // Authentification form defined here
  userForm: FormGroup;
  routes = routesAppFromRoot;

  constructor(public authService: AuthService,
              public Pwa: PwaService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.ssoPath = environment.apiUrl + Api.casLogin;
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
