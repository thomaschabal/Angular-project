import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {
  // Form to send a message to the admins of the site
  messageForm: FormGroup;

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

  // Submission of the contact form
  onSubmitMessage() {
    console.log(this.messageForm);
    if (this.messageForm.value.message !== '') {
      this.messagesService.materialPost(this.messageForm.value).subscribe(
        (res) => { alert(Phrases['messages.sent']); },
        (error) => { }
      );
    }
  }

}
