import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { fadeOut, fadeIn, unfoldIn, unfoldOut } from 'src/app/constants/Animations';
import { KEY_CODE } from '../image-viewer/image-viewer.component';

const OVERLAY_OPACITY = 0.65;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      transition(':enter', [unfoldIn('0.75s')]),
      transition(':leave', [unfoldOut('0.75s')])
    ]),
    trigger('overlay', [
      transition(':enter', [fadeIn(150, OVERLAY_OPACITY)]),
      transition(':leave', [fadeOut(150, OVERLAY_OPACITY)])
    ])
  ]
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.visible && event.code === KEY_CODE.ESCAPE) {
      this.onCloseModal();
    }
  }
}
