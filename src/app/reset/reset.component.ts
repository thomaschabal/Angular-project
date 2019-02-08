import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private httpClient : HttpClient,
              private router : Router,
              private authService : AuthService) { }

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
    const httpOptions = {
      headers : new HttpHeaders({
        'Allow-Control-Allow-Origin':'*',
        'Content-Type':'application/json'
      })
    };
    this.httpClient.post(this.authService.apiUrl + '/api/reset', this.resetForm.value, httpOptions)
    .subscribe(
      (res) => { console.log(res); },
      (error) => { console.log(error); }
    );
    this.router.navigate(['/auth']);
  }

}
