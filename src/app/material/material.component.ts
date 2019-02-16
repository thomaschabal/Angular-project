import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  animations : [
    // Animation on hover on the form
    trigger('formTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(0vh)'})),
      state('hidden', style({opacity: 0, transform : 'translateY(75vh)'})),
      transition(':enter', [ animate('70ms') ] )
    ])
  ]
})

export class MaterialComponent implements OnInit {

  // Form for material booking
  materialForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private httpService : HttpService) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the form
  initForm() {
    this.materialForm = this.formBuilder.group({
      matos : ['', Validators.required],
      message : ['', Validators.required]
    });
  }

  // Submission of the form
  onSubmitMateriel() {
    this.httpService.post('/api/materiel', this.materialForm.value);
  }

  //// DISPLAYING THE FORM
  // State of the form of the page (e.g. if the section is being hovered or not)
  formState = 'visible';

  survoleForm(state : string) {
    this.formState = state;
  }

}
