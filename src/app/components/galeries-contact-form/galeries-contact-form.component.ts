import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-galeries-contact-form',
  templateUrl: './galeries-contact-form.component.html',
  styleUrls: ['./galeries-contact-form.component.scss']
})
export class GaleriesContactFormComponent implements OnInit {

  // Contact form defined here
  messageForm: FormGroup;
  phrases: object;
  alertVisible = false;

  constructor(private messagesService: MessagesService,
              private formBuilder: FormBuilder) {
    this.phrases = Phrases;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.messageForm = this.formBuilder.group({
      matos : '',
      message : ['', Validators.required]
    });
  }

  onSubmitMessage() {
    this.messagesService.materialPost(this.messageForm.value).subscribe(
      (res) => { this.alertVisible = true; },
      (error) => { }
    );
  }

  closeAlert() {
    this.alertVisible = false;
  }
}
