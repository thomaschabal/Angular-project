import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() closeText: string;
  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  onCloseModal() {
    this.close.next();
  }
}
