import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagesService } from '../../../services/messages.service';

const DURATION_DISPLAYING = 6000;

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {
  // Form to send a message to the admins of the site
  messageForm: FormGroup;
  successMessage = false;
  failureMessage = false;

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessagesService) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the contact form
  initForm() {
    this.messageForm = this.formBuilder.group({
      message : ['', Validators.required]
    });
  }

  resetForm() {
    this.messageForm.reset();
    this.initForm();
  }

  // Submission of the contact form
  onSubmitMessage() {
    const inputMessage = this.messageForm.value.message;
    if (inputMessage !== '') {
      const messageToSend = 'Message envoyé depuis la page d\'accueil du site :\n\n' + inputMessage;
      this.messagesService.messagePost({ message: messageToSend }).subscribe(
        (res) => {
          this.successMessage = true;
          this.resetForm();
          setTimeout(() => this.successMessage = false, DURATION_DISPLAYING);
        },
        (error) => {
          this.failureMessage = true;
          setTimeout(() => this.failureMessage = false, DURATION_DISPLAYING);
        }
      );
    }
  }
}
