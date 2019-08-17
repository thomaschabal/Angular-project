import { Component, OnInit } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/animations';

import { MaterialBookingFormComponent } from '../../components/material-booking-form/material-booking-form.component';
import { Phrases } from '../../Phrases';

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

  phrases: object;
  // Form for material booking
  formState = 'visible';

  constructor() {
    this.phrases = Phrases;
  }

  ngOnInit() { }

  //// DISPLAYING THE FORM
  // State of the form of the page (e.g. if the section is being hovered or not)
  survoleForm(stateForm: string) {
    this.formState = stateForm;
  }
}
