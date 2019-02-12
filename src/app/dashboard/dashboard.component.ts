import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate, state } from "@angular/animations";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations : [
    trigger('buttonTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('150ms') ] ),
    ]),
    trigger('eventAnimation', [
      state('hidden', style({opacity: 0, height : '0em'})),
      state('visible', style({opacity : 1, height: '17em'})),
      transition('* => *', [ animate('1s') ]),
    ])
  ]
})
export class DashboardComponent implements OnInit {

  adminState = "hidden";
  filesState = "hidden";
  animEvent = "visible";

  eventCreationSelect = false;

  eventForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private httpService : HttpService) { }

  ngOnInit() {
    this.initForm();
  }

  survoleAdmin(state : string) {
    this.adminState = state;
  }

  survoleFiles(state : string) {
    this.filesState = state;
  }

  initForm() {
    this.eventForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      year_slug : ['2019', Validators.required],
      event_slug : 'event1',  //  /!\ Remplacer selon le back défini
      boolPrivate : ["on", Validators.required]
    })
  }

  formVisibility() {
    this.eventCreationSelect = !this.eventCreationSelect;
    // if (this.animEvent === "visible") {
    //   this.animEvent = "hidden";
    // } else {
    //   this.animEvent = "visible";
    // }
  }

  onSubmitEvent() {
    this.eventForm.value["private"] = this.eventForm.value["boolPrivate"];
    this.httpService.post('/api/create-gallery', this.eventForm.value);
  }
}
