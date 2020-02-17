import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { transition, trigger } from '@angular/animations';
import { KEY_CODE } from '../image-viewer/image-viewer.component';
import { bounceIn, fadeOut, fadeIn } from 'src/app/constants/Animations';

const OVERLAY_OPACITY = 0.65;
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alert', [
      transition(':enter', [bounceIn]),
      transition(':leave', [fadeOut(300)])
    ]),
    trigger('overlay', [
      transition(':enter', [fadeIn(150, OVERLAY_OPACITY)]),
      transition(':leave', [fadeOut(150, OVERLAY_OPACITY)])
    ])
  ]
})
export class AlertComponent implements OnInit {
  @Input() title: string;
  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  onCloseAlert() {
    this.close.next();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.visible && (event.code === KEY_CODE.ESCAPE || event.code === KEY_CODE.ENTER)) {
      this.onCloseAlert();
    }
  }

}
