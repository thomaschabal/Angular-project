import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Phrases } from '../Phrases';

import { GaleriesService } from '../services/galeries.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations : [
    // Hover animation
    trigger('buttonTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('150ms') ] ),
    ]),
    // Create gallery form animation
    trigger('eventAnimation', [
      state('hidden', style({opacity: 0, height : '0em'})),
      state('visible', style({opacity : 1, height: '17em'})),
      transition('* => *', [ animate('1s') ]),
    ])
  ]
})

export class DashboardComponent implements OnInit {

  // Display variables
  adminState = 'visible';
  filesState = 'visible';
  animEvent = 'visible';

  // Create gallery form initially hidden
  eventCreationSelect = true;

  // Create gallery form defined here
  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private galeriesService: GaleriesService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialize create gallery form
  initForm() {
    this.eventForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      year_slug : ['2019', Validators.required],
      event_slug : 'event1',  //  /!\ Remplacer selon le back défini
      boolPrivate : ['on', Validators.required]
    });
  }

  // Submission of gallery creation
  onSubmitEvent() {
    this.eventForm.value.private = this.eventForm.value.boolPrivate;
    this.galeriesService.postEvent(this.eventForm.value).subscribe(
      (res) => { alert(Phrases['dashboard.createdGallery']); },
      (error) => { console.error(error); }
    );
  }

  // On click on button "Modérer"
  navigateToModeration() {
    this.router.navigate(['/moderation']);
  }

  //// HOVER ANIMATIONS
  // Hover administration area
  survoleAdmin(stateAdmin: string) {
    this.adminState = stateAdmin;
  }

  // Hover upload file area
  survoleFiles(stateFiles: string) {
    this.filesState = stateFiles;
  }

  // Create gallery form visibility
  formVisibility() {
    this.eventCreationSelect = !this.eventCreationSelect;
  }

  // Navigation to a given url
  navigateToAddress(url: string) {
    window.location.href = url;
  }
}
