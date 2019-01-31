import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userForm : FormGroup;

  constructor(private authService : AuthService,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSignIn() {
    this.authService.signIn(this.userForm.value);
    this.router.navigate(['/home']);
  }

}
