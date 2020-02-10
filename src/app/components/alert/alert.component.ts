import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() title: string;
  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  onCloseModal() {
    this.close.next();
  }
}
