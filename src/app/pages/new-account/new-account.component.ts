import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  animations : [
    // Image transitions defined here
    trigger('backgroundAnimation', [
      // Various states defined as landmarks
      state('visible1', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/wei.jpg")'})),
      state('hidden1', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/wei.jpg")'})),
      state('visible2', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/font1.jpg")'})),
      state('hidden2', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/font1.jpg")'})),
      state('visible3', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/pom.jpg")'})),
      state('hidden3', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/pom.jpg")'})),
      state('visible4', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/voyage1.jpg")'})),
      state('hidden4', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/voyage1.jpg")'})),
      // Transitions between the previous states
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
  availablePromotions = ['015', '016', '017', '018', '019', '020', '021', '022'];
  phrases: object;
  routes = routesAppFromRoot;
  // Initial state
  state = 'visible1';
  indState = 0;
  // Possible states to reach (used in changeFond() )
  possibleStates = ['visible1', 'hidden1',
                    'visible2', 'hidden2',
                    'visible3', 'hidden3',
                    'visible4', 'hidden4'];

  // Register form defined here
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.phrases = Phrases;
  }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    this.userForm = this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      email : ['', Validators.required],
      promotion : ['', Validators.required],
      password : ['', Validators.required],
      confirmationPassword : ['', Validators.required],
    });
  }

  // Submission of the registration form
  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(formValue.firstname,
                             formValue.lastname,
                             formValue.email,
                             formValue.promotion,
                             formValue.password,
                             formValue.confirmationPassword);
    this.userService.addUser(newUser);
  }

  // Background image transitions
  changeFond() {
    if (this.indState !== this.possibleStates.length) {
      this.indState += 1;
    } else {
      this.indState = 0;
    }
    this.state = this.possibleStates[this.indState];
  }
}
