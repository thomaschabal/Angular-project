import { Component, OnInit, EventEmitter, Input, Output, HostListener, OnDestroy } from '@angular/core';
import { state, trigger, animate, style, transition, keyframes } from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { PicsService } from '../../services/pics.service';
import { pulse, fadeOut } from 'src/app/constants/Animations';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ESCAPE = 'Escape',
  ENTER = 'Enter'
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
    ]),
    trigger('changePicAnimation', [
      transition(':enter', [pulse()]),
      transition(':leave', [fadeOut(500)]),
      transition('* => *', [
        animate(200, keyframes([
          style({ offset: 0, opacity: 0 }),
          style({ offset: 1, opacity: 1 }),
        ]))
        // animate(500, keyframes([
        //   style({ offset: 0, transform: 'translateX(0)', opacity: 1 }),
        //   style({ offset: 0.5, transform: 'translateX(50vw)', opacity: 0 }),
        //   style({ offset: 0.51, transform: 'translateX(-50vw)', opacity: 0 }),
        //   style({ offset: 1, transform: 'translateX(0)', opacity: 1 }),
        // ]))
      ])
    ])
  ]
})

export class ImageViewerComponent implements OnInit, OnDestroy {

  widePicRef: SafeUrl;
  @Input() captionWidePic: string;
  @Input() indexPicture = 0;
  @Input() isGallery = true;
  rawPics: any[];
  @Output() changeIndexPicture = new EventEmitter<number>();
  @Output() closeViewer = new EventEmitter<boolean>();
  showArrows = true;
  slugPic: string;

  indexNewPicLoaded: Subscription;

  constructor(public picsService: PicsService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.indexNewPicLoaded = this.picsService.rawPicsIndexStream.subscribe(index => {
      if (index === this.indexPicture) {
        this.updateWidePic();
      }
    });
    this.rawPics = this.picsService.rawPics;
    this.updateWidePic();
  }

  ngOnDestroy() {
    this.indexNewPicLoaded.unsubscribe();
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

  filePathToSlug(filePath: string) {
    if (filePath.indexOf('/') > -1) {
      const file = filePath.split('/')[1];
      if (file.indexOf('.') > -1) {
        const slug = file.split('.')[0];
        return slug;
      }
      return file;
    }
    return filePath;
  }

  updateWidePic = async () => {
    this.widePicRef = this.sanitizer.bypassSecurityTrustUrl(this.picsService.rawPics[this.indexPicture]);

    const filePathPic = this.picsService.pics[this.indexPicture].file_path;
    this.slugPic = this.filePathToSlug(filePathPic);

    this.changeIndexPicture.emit(this.indexPicture);

    this.picsService.loadFullImage(this.indexPicture);
  }

  navLeft() {
    this.indexPicture = this.indexPicture - 1;
    if (this.indexPicture < 0) {
      this.indexPicture += (this.rawPics.length || Object.keys(this.rawPics).length);
    }
    this.updateWidePic();
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

  // Download picture
  downloadedDocumentName() {
    return this.captionWidePic + '-' + (this.indexPicture + 1) + '.jpg';
  }

  updateReaction(reaction: string) {
    this.picsService.pics[this.indexPicture].own_reaction = reaction;
  }
}
