import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  animations : [
    trigger('formTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(0)'})),
      state('hidden', style({opacity: 0, transform : 'translateY(75vh)'})),
      transition('* => *', [ animate('20ms') ] ),
    ])
  ]
})
export class MaterialComponent implements OnInit {

  materialForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private httpClient : HttpClient,
              private authService : AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.materialForm = this.formBuilder.group({
      matos : ['', Validators.required],
      message : ['', Validators.required]
    });
  }

  onSubmitMateriel() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Authorization':'Bearer '+this.authService.token
      })
    };
    this.httpClient.post(this.authService.apiUrl + '/api/materiel', this.materialForm.value, httpOptions)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => { console.log("Erreur " + error); }
    );
  }

  // State of the form of the page (e.g. if the section is being hovered or not)
  formState = 'hidden';

  survoleForm(state : string) {
    this.formState = state;
  }

}
