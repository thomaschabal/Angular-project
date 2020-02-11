import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import MATERIAL from '../../constants/Material';
import { Phrases } from '../../Phrases';

const DURATION_DISPLAYING = 6000;
const EMPTY_FORM = {
  matos : ['', Validators.required],
  message : ['', Validators.required]
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
    this.materialForm.controls.matos.setValue(matosString);
  }

  resetForm() {
    this.materialForm.reset();
    this.initForm();
  }

  // Submission of the form
  onSubmitMateriel() {
    this.messagesService.materialPost(this.materialForm.value).subscribe(
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
