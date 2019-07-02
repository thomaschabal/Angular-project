import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { MessagesService } from '../services/messages.service';

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

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessagesService) { }

  // Form for material booking
  materialForm: FormGroup;

  //// DISPLAYING THE FORM
  // State of the form of the page (e.g. if the section is being hovered or not)
  formState = 'visible';

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
    this.messagesService.materialPost(this.materialForm.value).subscribe(
      (res) => { alert('Message envoyé !'); },
      (error) => { console.error(error); }
    );
  }

  survoleForm(currentState: string) {
    this.formState = currentState;
  }

}
