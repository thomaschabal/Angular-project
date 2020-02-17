import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  displayContent = false;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  formVisibility() {
    this.displayContent = !this.displayContent;
  }
}
