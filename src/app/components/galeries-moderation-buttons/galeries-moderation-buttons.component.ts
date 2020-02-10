import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { UploadComponent } from '../upload/upload.component';
import { HttpService } from '../../services/http.service';
import { GaleriesService } from '../../services/galeries.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';
import KEY_CODE from '../../constants/KeyCode';

@Component({
  selector: 'app-galeries-moderation-buttons',
  templateUrl: './galeries-moderation-buttons.component.html',
  styleUrls: ['./galeries-moderation-buttons.component.scss']
})
export class GaleriesModerationButtonsComponent implements OnInit {
  isAdmin: boolean;
  isPublic = false;
  @Output() moderating = new EventEmitter<boolean>();
  enModeration = false;
  @Input() selectedRoute: string;
  @Input() moderationState: any[];
  moderationVisibility = 'hidden';
  galleryDeletionModal = 'hidden';
  galleryDeletedModal = 'hidden';

  constructor(private galeriesService: GaleriesService,
              private httpService: HttpService,
              private router: Router) {
  }

  ngOnInit() {
    this.isPublic = this.galeriesService.isPublicOrPrivate(this.selectedRoute);
    this.isAdmin = this.httpService.isAdmin;
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

  openGalleryDeletionModal() {
    this.galleryDeletionModal = 'visible';
  }
  closeGalleryDeletionModal() {
    this.galleryDeletionModal = 'hidden';
  }

  finalRedirection() {
    this.router.navigate([routesAppFromRoot.galeries]);
  }

  // Delete the event, in the moderation phase
  deleteEvent() {
    this.galeriesService.deleteEvent(this.selectedRoute).subscribe(
      (res) => {
        this.galleryDeletedModal = 'visible';
      },
      (error) => { }
    );
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

  displayModerationArea() {
    this.moderationVisibility = 'visible';
  }
  hideModerationArea() {
    this.moderationVisibility = 'hidden';
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE && this.moderationVisibility === 'visible') {
      if (this.galleryDeletionModal === 'visible') {
        this.closeGalleryDeletionModal();
      } else {
        this.hideModerationArea();
      }
    }
  }
}
