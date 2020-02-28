import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GaleriesService } from '../../../services/galeries.service';
import { CURRENT_YEAR, YEARS_SLUGS, SCHOOL_YEARS_SLUGS, GALLERY_TYPES } from '../../../Constants';

const DURATION_DISPLAYING = 6000;
const EMPTY_FORM = {
  name: ['', Validators.required],
  description: ['', Validators.required],
  year_slug: ['' + CURRENT_YEAR, Validators.required],
  event_slug: 'vap-2019', //  /!\ Remplacer selon le back défini
  boolPrivate: ['on', Validators.required],
  type: [GALLERY_TYPES[0], Validators.required]
};

@Component({
  selector: 'app-gallery-creation-form',
  templateUrl: './gallery-creation-form.component.html',
  styleUrls: ['./gallery-creation-form.component.scss']
})
export class GalleryCreationFormComponent implements OnInit {
  // Create gallery form defined here
  eventForm: FormGroup;
  SLUGS = SCHOOL_YEARS_SLUGS;
  YEARS = YEARS_SLUGS;
  TYPES = GALLERY_TYPES;
  successCreation = false;
  failureCreation = false;

  constructor(
    private formBuilder: FormBuilder,
    private galeriesService: GaleriesService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialize create gallery form
  initForm() {
    this.eventForm = this.formBuilder.group(EMPTY_FORM);
  }

  onChangeYear(e: Event) {
    // @ts-ignore
    const newYear = e.target.value;
    this.eventForm.value.year_slug = newYear;
  }

  onChangeType(e: Event) {
    // @ts-ignore
    const newType = e.target.value;
    this.eventForm.value.type = newType.toUpperCase();
  }

  resetForm() {
    this.eventForm.reset();
    this.initForm();
  }

  // Submission of gallery creation
  onSubmitEvent() {
    this.eventForm.value.private = this.eventForm.value.boolPrivate;
    this.galeriesService.postEvent(this.eventForm.value).subscribe(
      res => {
        this.successCreation = true;
        this.resetForm();
        setTimeout(() => this.successCreation = false, DURATION_DISPLAYING);
      },
      error => {
        this.failureCreation = true;
        setTimeout(() => this.failureCreation = false, DURATION_DISPLAYING);
      }
    );
  }
}
