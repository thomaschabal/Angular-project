import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-material-booking-form',
  templateUrl: './material-booking-form.component.html',
  styleUrls: ['./material-booking-form.component.scss']
})
export class MaterialBookingFormComponent implements OnInit {

  phrases = Phrases;
  materialForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessagesService) { }

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
      (res) => { alert(Phrases['messages.sent']); },
      (error) => { console.error(error); }
    );
  }
}
