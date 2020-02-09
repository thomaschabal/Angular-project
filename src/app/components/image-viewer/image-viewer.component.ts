import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PicsService } from '../../services/pics.service';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ESCAPE = 'Escape'
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

  widePicRef: SafeUrl;
  @Input() captionWidePic: string;
  @Input() indexPicture = 0;
  @Input() isGallery = true;
  rawPics: any[];
  @Output() changeIndexPicture = new EventEmitter<number>();
  @Output() closeViewer = new EventEmitter<boolean>();
  showArrows = true;

  constructor(private picsService: PicsService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.rawPics = this.picsService.rawPics;
    this.updateWidePic();
  }

  // Host Listener for the image viewer
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === KEY_CODE.LEFT_ARROW) {
      if (this.indexPicture > 0) {
        this.navLeft();
      }
    } else {
      if (event.code === KEY_CODE.RIGHT_ARROW) {
        if (this.indexPicture < this.picsService.numberOfPics - 1) {
          this.navRight();
        }
      } else {
        if (event.code === KEY_CODE.ESCAPE) {
          this.closeWidePic();
        }
      }
    }
  }

  updateWidePic() {
    this.widePicRef = this.sanitizer.bypassSecurityTrustUrl(this.picsService.rawPics[this.indexPicture]);
    this.changeIndexPicture.emit(this.indexPicture);
    this.picsService.loadFullImage(this.indexPicture).then(
      () => this.widePicRef = this.sanitizer.bypassSecurityTrustUrl(this.picsService.rawPics[this.indexPicture])
    );
  }

  navLeft() {
    this.indexPicture = this.indexPicture - 1;
    if (this.indexPicture < 0) {
      this.indexPicture += (this.rawPics.length || Object.keys(this.rawPics).length);
    }
    this.updateWidePic();
    // document.getElementById('wide-pic').style.marginLeft.px=this.placePicLeft(imgWide);
  }

  navRight() {
    this.indexPicture = (this.indexPicture + 1) % (this.rawPics.length || Object.keys(this.rawPics).length);
    this.updateWidePic();
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
  placePicTop(img) {
    return ( (window.innerHeight - img.clientHeight) / 2 );
  }

  // Download picture
  downloadedDocumentName() {
    return this.captionWidePic + '-' + (this.indexPicture + 1) + '.jpg';
  }
}
