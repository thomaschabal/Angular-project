import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { HttpService } from '../services/http.service';

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
              private httpService : HttpService) { }

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
    this.httpService.post('/api/materiel', this.materialForm.value);
  }

  // State of the form of the page (e.g. if the section is being hovered or not)
  formState = 'hidden';

  survoleForm(state : string) {
    this.formState = state;
  }

}
