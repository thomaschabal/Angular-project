import { HttpService } from '@src/app/services/http.service';
import { Injectable } from '@angular/core';

import API_ROUTES from '@src/app/services/Api';
import {
  GetAllGalleriesResponse,
  PhotoGallery,
  GetPrivatePhotoGalleriesResponse,
  GetPrivateVideoGalleriesResponse,
  VideoGallery,
  CreateGalleryRequest
} from '@src/app/types/galeries.types';

export const DEFAULT_PAGE_SIZE = 15;

@Injectable()
export class GaleriesService {
  galeriesEvents: PhotoGallery[] = [];
  areGaleriesEventsLoaded = false;
  numberOfPublicEvents: number;

  privatePhotoEvents: PhotoGallery[] = [];
  arePrivatePhotoEventsLoaded = false;

  privateVideoEvents: VideoGallery[] = [];
  arePrivateVideoEventsLoaded = false;
  displaySpinner = true;

  page = 1;
  isLoadingMoreEvents = false;

  constructor(private httpService: HttpService) {}

  // Determine whether the gallery is public or private
  isPublicOrPrivate(routeGallery: string) {
    let isPublic = true;
    for (const event of this.privatePhotoEvents) {
      if (event.slug === routeGallery) {
        isPublic = false;
      }
    }
    return isPublic;
  }

  // Delete an event
  deleteEvent(event: string) {
    return this.httpService.delete(API_ROUTES.galleries + event);
  }

  // Get the image associated to some event
  getEventByName(event: string, page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    return this.httpService.post(API_ROUTES.getImages + event, {'image-slug': event, page, page_size: pageSize});
  }

  // Get the list of all events
  getAllEvents(page: number, pageSize: number) {
    return this.httpService.post(API_ROUTES.getAllGalleries, { page, page_size: pageSize }).toPromise();
  }

  getAllEventsInitial(pageSize: number) {
    if (!this.areGaleriesEventsLoaded) {
      return this.getAllEvents(1, pageSize)
        .then(
          (res: GetAllGalleriesResponse) => {
            const { number_of_galleries, galleries } = res;
            this.galeriesEvents = galleries;
            this.numberOfPublicEvents = number_of_galleries;
            setTimeout(() => { this.displaySpinner = false; }, 200);
            this.areGaleriesEventsLoaded = true;
          },
          (error) => { }
        );
    }
  }

  getEventsOfYear(year: string) {
    return this.httpService.get(API_ROUTES.getGalleriesOfYear + year);
  }

  // Get the list of all private events
  getPrivatePhotos() {
    if (this.httpService.isAdmin === true && !this.arePrivatePhotoEventsLoaded) {
      return this.httpService.get(API_ROUTES.getPrivatePhotoGalleries)
        .toPromise()
        .then(
          (res: GetPrivatePhotoGalleriesResponse) => {
            const { galleries } = res;
            this.privatePhotoEvents = galleries;
            this.arePrivatePhotoEventsLoaded = true;
          },
          (error) => { }
        );
    }
  }

  getPrivateVideos() {
    if (this.httpService.isAdmin === true && !this.arePrivateVideoEventsLoaded) {
      return this.httpService.get(API_ROUTES.getPrivateVideoGalleries)
        .toPromise()
        .then(
          (res: GetPrivateVideoGalleriesResponse) => {
            const { galleries } = res;
            this.privateVideoEvents = galleries;
            this.arePrivateVideoEventsLoaded = true;
          },
          (error) => { }
        );
    }
  }

  // Get a random image for some event
  getImage(event: string) {
    return this.httpService.get(API_ROUTES.getRandomImage + event);
  }

  // Turn a gallery to private
  makePrivate(slug: string) {
    return this.httpService.post(API_ROUTES.makePrivate, {gallery_slugs : [slug]});
  }

  // Turn a gallery to public
  makePublic(slug: string) {
    return this.httpService.post(API_ROUTES.makePublic, {gallery_slugs : [slug]});
  }

  // Get the full picture (not the thumbnail) associated to some path
  getFullImage(path: string) {
    return this.httpService.post(API_ROUTES.getFullImage, {file_path : path});
  }

  //// DASHBOARD METHODS
  postEvent(event: CreateGalleryRequest) {
    return this.httpService.post(API_ROUTES.createGallery, event);
  }

  getModerationFiles() {
    return this.httpService.get(API_ROUTES.filesNotModerated);
  }

  loadPrivateEvents = async () => {
    // Restricted to admins
    await this.getPrivatePhotos();
    await this.getPrivateVideos();
    return Promise.resolve();
  }

  //// METHODS FOR GALERIES COMPONENT
  loadEvents = async () => {
    await this.getAllEventsInitial(DEFAULT_PAGE_SIZE);
    return Promise.resolve();
  }

  loadMoreEvents() {
  if (this.page * DEFAULT_PAGE_SIZE < this.numberOfPublicEvents && !this.isLoadingMoreEvents) {
      this.isLoadingMoreEvents = true;
      this.getAllEvents(this.page + 1, DEFAULT_PAGE_SIZE)
        .then(
          (res: GetAllGalleriesResponse) => {
            const { galleries } = res;
            this.galeriesEvents = this.galeriesEvents.concat(galleries);
            this.page ++;
            this.isLoadingMoreEvents = false;
          },
          (error) => { }
        );
    }
  }
}
