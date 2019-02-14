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
    trigger('backgroundAnimation', [
      state('visible1', style({opacity: 0.5,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../assets/images/wei.jpg")',
                               backgroundPosition : 'center center',
                               width: '120%'})),
      state('hidden1', style({opacity: 0.2,
                              transform: 'translateX(-14em)',
                              backgroundImage : 'url("../../assets/images/wei.jpg")',
                              backgroundPosition : 'center center',
                              width: '120%'})),
      state('visible2', style({opacity: 0.5,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../assets/images/font1.jpg")',
                               backgroundPosition : 'center center',
                               width: '120%'})),
      state('hidden2', style({opacity: 0.2,
                              transform: 'translateX(-14em)',
                              backgroundImage : 'url("../../assets/images/font1.jpg")',
                              backgroundPosition : 'center center',
                              width: '120%'})),
      state('visible3', style({opacity: 0.5,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../assets/images/pom.jpg")',
                               backgroundPosition : 'center center',
                               width: '120%'})),
      state('hidden3', style({opacity: 0.2,
                              transform: 'translateX(-14em)',
                              backgroundImage : 'url("../../assets/images/pom.jpg")',
                              backgroundPosition : 'center center',
                              width: '120%'})),
      state('visible4', style({opacity: 0.5,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../assets/images/voyage1.jpg")',
                               backgroundPosition : 'center center',
                               width: '120%'})),
      state('hidden4', style({opacity: 0.2,
                              transform: 'translateX(-14em)',
                              backgroundImage : 'url("../../assets/images/voyage1.jpg")',
                              backgroundPosition : 'center center',
                              width: '120%'})),
      transition('visible1 => hidden1', [ animate(6000) ] ),
      transition('visible2 => hidden2', [ animate(6000) ] ),
      transition('visible3 => hidden3', [ animate(6000) ] ),
      transition('visible4 => hidden4', [ animate(6000) ] ),
      transition('hidden1 => visible2', [ animate(0) ] ),
      transition('hidden2 => visible3', [ animate(0) ] ),
      transition('hidden3 => visible4', [ animate(0) ] ),
      transition('hidden4 => visible1', [ animate(0) ] )
    ])
  ]
})
export class AuthComponent implements OnInit {

  state = "visible1";
  indState = 0;
  possibleStates = ["visible1", "hidden1",
                    "visible2", "hidden2",
                    "visible3", "hidden3",
                    "visible4", "hidden4"];

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

  changeFond() {
    //this.state1 = this.state1 === "visible" ? "hidden" : "visible";
    if (this.indState !== this.possibleStates.length) {
      this.indState += 1;
    } else {
      this.indState = 0;
    }
    this.state = this.possibleStates[this.indState];
  }

  onSignIn() {
    this.authService.signIn(this.userForm.value);
    
  }

}
