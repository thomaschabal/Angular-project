import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

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

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(formValue['firstname'],
                             formValue['lastname'],
                             formValue['email'],
                             formValue['promotion'],
                             formValue['password'],
                             formValue['confirmation_password']);
    this.userService.addUser(newUser);
    this.router.navigate(['/auth']);
  }
}
