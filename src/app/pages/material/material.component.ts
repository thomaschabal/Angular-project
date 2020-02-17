import { Component, OnInit } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/animations';

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
  formState = 'visible';

  constructor() {
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  //// DISPLAYING THE FORM
  // State of the form of the page (e.g. if the section is being hovered or not)
  survoleForm(stateForm: string) {
    this.formState = stateForm;
  }
}
