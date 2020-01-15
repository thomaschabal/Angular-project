import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthFooterComponent } from '../../components/auth-footer/auth-footer.component';
import { routesAppFromRoot } from '../../Routes';
import { BREAKPOINTS } from '../../Constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {

  // Authentification form defined here
  userForm: FormGroup;
  routes = routesAppFromRoot;
  isMobile: boolean;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.initForm();
    this.getBreakpoint();
  }

  getBreakpoint() {
    this.isMobile = window.innerWidth <= BREAKPOINTS.SMALL;
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
