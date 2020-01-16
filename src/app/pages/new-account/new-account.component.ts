import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { routesAppFromRoot } from '../../Routes';
import { AVAILABLE_PROMOTIONS } from '../../Constants';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})

export class NewAccountComponent implements OnInit {
  availablePromotions = AVAILABLE_PROMOTIONS;
  routes = routesAppFromRoot;
  // Register form defined here
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
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
}
