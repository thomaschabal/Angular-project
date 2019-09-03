import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UploadComponent } from '../upload/upload.component';
import { GaleriesService } from '../../services/galeries.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-galeries-moderation-buttons',
  templateUrl: './galeries-moderation-buttons.component.html',
  styleUrls: ['./galeries-moderation-buttons.component.scss']
})
export class GaleriesModerationButtonsComponent implements OnInit {

  isPublic = false;
  clickAddFiles = false;
  @Output() moderating = new EventEmitter<boolean>();
  enModeration = false;
  eventDeletionState = 'nothing';
  @Input() selectedRoute: string;
  @Input() moderationState: any[];
  phrases: object;

  constructor(private galeriesService: GaleriesService,
              private router: Router) {
    this.phrases = Phrases;
  }

  ngOnInit() {
    this.isPublic = this.galeriesService.isPublicOrPrivate(this.selectedRoute);
  }

  // Return whether the administrator is moderating the gallery or not
  modere() {
    this.enModeration = !this.enModeration;
    this.moderating.emit(this.enModeration);
  }

  // Change the state of the gallery to public or private
  publicPrivate() {
    if (this.isPublic) {
      this.galeriesService.makePrivate(this.selectedRoute)
      .subscribe(
        (res) => { this.isPublic = !this.isPublic; }
      );
    } else {
      this.galeriesService.makePublic(this.selectedRoute)
      .subscribe(
        (res) => { this.isPublic = !this.isPublic; }
      );
    }
  }

  // Delete the event, in the moderation phase
  deleteEvent() {
    if (this.eventDeletionState === 'nothing') {
      this.eventDeletionState = 'nearly deleted';
      alert(Phrases['event.deleteGallery.galleryWillBeDeleted']);
      // If the deletion confirmation didn't take place within 15s, then the gallery won't be deleted now
      setTimeout(() => this.eventDeletionState = 'nothing', 15000);
    } else {
      this.galeriesService.deleteEvent(this.selectedRoute).subscribe(
        (res) => {
          alert(Phrases['event.deleteGallery.galleryWasDeleted']);
          this.router.navigate([routesAppFromRoot.galeries]);
        },
        (error) => { }
      );
    }
  }

  // Reveal the file uploader
  prepareAddFiles() {
    this.clickAddFiles = !this.clickAddFiles;
  }

  // Validate the deletion of selected pictures
  validateDeletionPics() {
    for (let pic = 0; pic < this.moderationState.length; pic++) {
      if (this.moderationState[pic]) {
        // console.log(this.pics[pic].file_path);
        console.log(pic);
      }
    }
  }
}
