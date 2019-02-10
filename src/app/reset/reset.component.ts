import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private httpService : HttpService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.resetForm = this.formBuilder.group({
      email : ['', Validators.required]
    });
  }

  onSubmitForm() {
    this.resetForm.value["email"] = this.resetForm.value["email"] + '@eleves.enpc.fr';
    this.httpService.post('/api/reset', this.resetForm.value);
    this.router.navigate(['/auth']);
  }

}
