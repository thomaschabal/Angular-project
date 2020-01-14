import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})


export class ResetComponent implements OnInit {
  routes = routesAppFromRoot;
  // Reset form defined here
  resetForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    this.resetForm = this.formBuilder.group({
      email : ['', Validators.required]
    });
  }

  // Submission of the reset form
  onSubmitForm() {
    this.resetForm.value.email = this.resetForm.value.email + '@eleves.enpc.fr';
    this.userService.resetUser(this.resetForm.value).subscribe(
      (res) => { alert(Phrases['reset.sentEmail']); },
      (error) => { }
    );
    this.router.navigate([routesAppFromRoot.auth]);
  }
}
