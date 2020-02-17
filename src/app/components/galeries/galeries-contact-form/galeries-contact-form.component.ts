import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagesService } from '../../../services/messages.service';
import { PicsService } from '../../../services/pics.service';

const DURATION_DISPLAYING = 6000;

@Component({
  selector: 'app-galeries-contact-form',
  templateUrl: './galeries-contact-form.component.html',
  styleUrls: ['./galeries-contact-form.component.scss']
})
export class GaleriesContactFormComponent implements OnInit {

  // Contact form defined here
  messageForm: FormGroup;
  alertVisible = false;

  constructor(private messagesService: MessagesService,
              private picsService: PicsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.messageForm = this.formBuilder.group({
      message : ['', Validators.required]
    });
  }

  resetForm() {
    this.messageForm.reset();
    this.initForm();
  }

  onSubmitMessage() {
    const sentFromGallery = 'Message envoyé depuis la galerie de slug : ' + this.picsService.currentGallery + '\n\n';
    const galleryUrl = 'URL de la galerie : ' + window.location.href + '\n\n';
    const inputMessage = 'Contenu du message : \n\n' + this.messageForm.value.message;
    const messageContent = sentFromGallery + galleryUrl + inputMessage;
    this.messagesService.messagePost({ message: messageContent }).subscribe(
      (res) => {
        this.alertVisible = true;
        this.resetForm();
      },
      (error) => { }
    );
  }

  closeAlert() {
    this.alertVisible = false;
  }
}
