import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import API_ROUTES from './Api';

export const DEFAULT_PAGE_SIZE = 15;

@Injectable()
export class GaleriesService {
  galeriesEvents = [];
  areGaleriesEventsLoaded = false;
  privateEvents = [];
  arePrivateEventsLoaded = false;
  displaySpinner = true;
  stateSpinner = 'visible';

  constructor(private httpService: HttpService) {}

  // Determine whether the gallery is public or private
  isPublicOrPrivate(routeGallery: string) {
    let isPublic = true;
    for (const event of this.privateEvents) {
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
  getAllEvents() {
    if (!this.areGaleriesEventsLoaded) {
      return this.httpService.get(API_ROUTES.getAllGalleries)
        .toPromise()
        .then(
          (res: { galleries }) => {
            this.galeriesEvents = res.galleries;
            this.stateSpinner = 'hidden';
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
  getPrivateEvents() {
    if (this.httpService.isAdmin === true && !this.arePrivateEventsLoaded) {
      return this.httpService.get(API_ROUTES.getPrivateGalleries)
        .toPromise()
        .then(
          (res: { galleries }) => {
            this.privateEvents = res.galleries;
            this.arePrivateEventsLoaded = true;
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
  postEvent(event: any) {
    return this.httpService.post(API_ROUTES.createGallery, event);
  }

  getModerationFiles() {
    return this.httpService.get(API_ROUTES.filesNotModerated);
  }

  //// METHODS FOR GALERIES COMPONENT
  loadEvents = async () => {
    await this.getAllEvents();
    // Restricted to admins
    await this.getPrivateEvents();

    return Promise.resolve();
  }
}
