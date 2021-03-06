import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { VideoService } from 'src/app/services/video.service';
import { HttpService } from '../../../services/http.service';
import { GaleriesService } from '../../../services/galeries.service';
import { routesAppFromRoot } from '../../../Routes';
import KEY_CODE from '../../../constants/KeyCode';

@Component({
  selector: 'app-galeries-moderation-buttons',
  templateUrl: './galeries-moderation-buttons.component.html',
  styleUrls: ['./galeries-moderation-buttons.component.scss']
})
export class GaleriesModerationButtonsComponent implements OnInit, OnChanges {
  isPublic = false;
  @Output() moderating = new EventEmitter<boolean>();
  enModeration = false;
  @Input() selectedRoute: string;
  @Input() moderationState: any[];
  moderationVisibility = false;
  galleryDeletionModal = false;
  galleryDeletedModal = false;
  @Input() isVideoGallery = false;
  @Input() isVideoPrivate: boolean;

  constructor(private galeriesService: GaleriesService,
              public videoService: VideoService,
              public httpService: HttpService,
              private router: Router) {
  }

  ngOnInit() {
    this.isPublic = this.isGalleryPublic();
  }

  ngOnChanges() {
    this.isPublic = this.isGalleryPublic();
  }

  isGalleryPublic() {
    return (this.isVideoGallery) ? !this.isVideoPrivate : this.galeriesService.isPublicOrPrivate(this.selectedRoute);
  }

  isGalleryFull() {
    const { has_cover_image, has_video } = this.videoService.movieDetails;
    return this.isVideoGallery && has_cover_image && has_video;
  }

  coverImageThumbSrc() {
    return this.videoService.coverImageThumbUrl;
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
    this.galleryDeletionModal = true;
  }
  closeGalleryDeletionModal() {
    this.galleryDeletionModal = false;
  }

  finalRedirection() {
    this.router.navigate([routesAppFromRoot.galeries]);
  }

  // Delete the event, in the moderation phase
  deleteEvent() {
    this.galeriesService.deleteEvent(this.selectedRoute).subscribe(
      (res) => {
        this.galleryDeletedModal = true;
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
    this.moderationVisibility = true;
  }
  hideModerationArea() {
    this.moderationVisibility = false;
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE && this.moderationVisibility === true) {
      if (this.galleryDeletionModal === true) {
        this.closeGalleryDeletionModal();
      } else {
        this.hideModerationArea();
      }
    }
  }
}
