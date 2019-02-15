import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
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
export class NewAccountComponent implements OnInit {

  state = "visible1";
  indState = 0;
  possibleStates = ["visible1", "hidden1",
                    "visible2", "hidden2",
                    "visible3", "hidden3",
                    "visible4", "hidden4"];

  userForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private userService : UserService,
              private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      email : ['', Validators.required],
      promotion : ['', Validators.required],
      password : ['', Validators.required],
      confirmation_password : ['', Validators.required],
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

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(formValue['firstname'],
                             formValue['lastname'],
                             formValue['email'],
                             formValue['promotion'],
                             formValue['password'],
                             formValue['confirmation_password']);
    this.userService.addUser(newUser);
  }

}
