import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations : [
    trigger('backgroundAnimation1', [
      state('visible', style({opacity: 1,  backgroundImage : 'url("../../assets/images/wei.jpg")'})),
      state('hidden', style({opacity: 1,  backgroundImage : 'url("../../assets/images/font1.jpg")'})),
      transition('* => *', [ animate(6000) ] )
    ]),
    trigger('backgroundAnimation2', [
      state('visible', style({opacity: 1,  backgroundImage : 'url("../../assets/images/font1.jpg")'})),
      state('hidden', style({opacity: 0,  backgroundImage : 'url("../../assets/images/font1.jpg")'})),
      transition('* => *', [ animate(6000) ] )
    ])
  ]
})
export class AuthComponent implements OnInit {

  state1 = "visible";
  state2 = "hidden";

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

  changeFond1() {
    this.state1 = this.state1 === "visible" ? "hidden" : "visible";
  }

  changeFond2() {
    this.state2 = this.state2 === "visible" ? "hidden" : "visible";
  }

  onSignIn() {
    this.authService.signIn(this.userForm.value);
    this.router.navigate(['/home']);
  }

}
