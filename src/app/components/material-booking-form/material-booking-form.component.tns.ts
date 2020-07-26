import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagesService } from '@src/app/services/messages.service';
import MATERIAL from '@src/app/constants/Material';

const UNIT = 8;
const DURATION_DISPLAYING = 6000;
const EMPTY_FORM = {
  device : ['', Validators.required],
  message : ['', Validators.required],
  date: ['', Validators.required]
};

@Component({
  selector: 'app-material-booking-form',
  templateUrl: './material-booking-form.component.html',
  styleUrls: ['./material-booking-form.component.scss']
})
export class MaterialBookingFormComponent implements OnInit {
  successMessage = false;
  failureMessage = false;
  materialForm: FormGroup;
  listMatos = MATERIAL;
  allAccessories = MATERIAL.map(item => item.name);
  selectedItems = {};

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessagesService) { }

  ngOnInit() {
    this.initForm();
  }

  sizeMatosContainer() {
    return this.listMatos.length * (22 * UNIT + 2 * UNIT);
  }

  // Initialisation of the form
  initForm() {
    this.materialForm = this.formBuilder.group(EMPTY_FORM);
  }

  onClickItem(item: any) {
    if (this.selectedItems[item.name]) {
      delete this.selectedItems[item.name];
    } else {
      this.selectedItems[item.name] = true;
    }
    let matosString = '';
    Object.keys(this.selectedItems).map(it => matosString += it + ', ');
    this.materialForm.controls.device.setValue(Object.keys(this.selectedItems).join(', '));
  }

  resetForm() {
    this.materialForm.reset();
    this.selectedItems = {};
    this.initForm();
  }

  formattedForm() {
    const formValue = this.materialForm.value;

    const stuffAsked = 'Matériel demandé : \n' + Object.keys(this.selectedItems).map(item => '- ' + item).join('\n');
    const dateAsked = 'Dates souhaitées : ' + formValue.date;
    const userMessage = 'Le projet : ' + formValue.message;

    const formattedForm = this.formBuilder.group(formValue);
    formattedForm.controls.message.setValue(stuffAsked + '\n\n' + dateAsked + '\n\n' + userMessage);
    formattedForm.removeControl('date');

    return formattedForm.value;
  }

  // Submission of the form
  onSubmitMateriel() {
    this.messagesService.materialPost(this.formattedForm()).subscribe(
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
