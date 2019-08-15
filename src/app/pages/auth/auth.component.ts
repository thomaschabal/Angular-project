import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthFooterComponent } from '../../components/auth-footer/auth-footer.component';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {

  // Authentification form defined here
  userForm: FormGroup;
  phrases: object;
  routes: object;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.phrases = Phrases;
    this.routes = routesAppFromRoot;
  }

  ngOnInit() {
    this.initForm();
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
}
