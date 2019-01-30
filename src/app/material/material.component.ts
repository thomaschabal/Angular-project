import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { state, style, transition, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  animations : [
    trigger('formTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0, transform : 'translateY(75vh)'})),
      transition('* => *', [ animate('20ms') ] ),
    ])
  ]
})
export class MaterialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    console.log(form.value);
    const name = form.value['name'];
    const email = form.value['email'];
    const matos = form.value['matos'];
    const message = form.value['message'];
    console.log(name + " a comme mail " + email + ", veut réserver " + matos + " parce que " + message);
  }

  // State of the form of the page (e.g. if the section is being hovered or not)
  formState = 'hidden';

  survoleForm(state : string) {
    this.formState = state;
  }

}
