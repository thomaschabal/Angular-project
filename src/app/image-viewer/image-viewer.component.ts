import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';

import { PicsService } from '../services/pics.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  animations: [
    trigger('widePicsAnimation', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('*=>*', [ animate('200ms') ] ),
    ])
  ]
})

export class ImageViewerComponent implements OnInit {

  widePicRef: any;
  @Input() captionWidePic: string;
  @Input() indexPicture = 0;
  rawPics: any[];
  @Output() closeViewer = new EventEmitter<boolean>();
  showArrows = true;

  constructor(private picsService: PicsService) { }

  ngOnInit() {
    this.rawPics = this.picsService.rawPics;
    this.widePicRef = this.rawPics[this.indexPicture];
  }

  // Host Listener for the image viewer
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.navLeft();
    } else {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.navRight();
      } else {
        if (event.keyCode === KEY_CODE.ESCAPE) {
          this.closeWidePic();
        }
      }
    }
  }

  navLeft() {
    this.indexPicture = this.indexPicture - 1;
    if (this.indexPicture < 0) {
      this.indexPicture += this.rawPics.length;
    }
    this.widePicRef = this.rawPics[this.indexPicture];
    // document.getElementById('wide-pic').style.marginLeft.px=this.placePicLeft(imgWide);
  }

  navRight() {
    this.indexPicture = (this.indexPicture + 1) % (this.rawPics.length);
    this.widePicRef = this.rawPics[this.indexPicture];
  }

  closeWidePic() {
    this.closeViewer.emit(false);
  }

  // Show or hide arrows for the enlarged pics when hovered
  displayArrows() {
    this.showArrows = true;
  }
  hideArrows() {
    this.showArrows = false;
  }
  placePicLeft(img) {
    return ( (window.innerWidth - img.clientWidth) / 2 );
  }
  placePicTop(img) {
    return ( (window.innerHeight - img.clientHeight) / 2 );
  }
}
