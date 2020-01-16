import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import API_ROUTES from './Api';

@Injectable()
export class GaleriesService {
  galeriesEvents = [];
  areGaleriesEventsLoaded = false;
  privateEvents = [];
  arePrivateEventsLoaded = false;
  eventPics: any[];
  pic: any;
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
  getEventByName(event: string) {
    return this.httpService.post(API_ROUTES.getImages + event, {'image-slug': event});
  }

  // Get the list of all events
  getAllEvents() {
    if (!this.areGaleriesEventsLoaded && this.httpService.isAdmin) {
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
    await this.getPrivateEvents();
    // Restricted to admins
    await this.getAllEvents();
    // Restricted to not admin users
    await this.getRestrictedEvents();

    return Promise.resolve();
  }

  getEventsOfYear2A(userProm2A) {
    this.getEventsOfYear(userProm2A).subscribe(
      (response: { public_galleries }) => {
        this.galeriesEvents = this.galeriesEvents.concat(response.public_galleries);
        this.getImagesRestrictedGalleries();
      },
      (err) => { }
    );
  }

  getRestrictedEvents = async () => {
    // Define the years regarding the user
    const userProm1A = ( +('2' + this.httpService.promotion) - 3) + '';
    const userProm2A = ( +('2' + this.httpService.promotion) - 2) + '';

    if (!this.areGaleriesEventsLoaded && !this.httpService.isAdmin) {
      // Get the events of both years
      this.getEventsOfYear(userProm1A)
        .toPromise()
        .then(
          async (res: { public_galleries }) => {
            this.galeriesEvents = res.public_galleries;
            await this.getEventsOfYear2A(userProm2A);
            this.stateSpinner = 'hidden';
            setTimeout(() => { this.displaySpinner = false; }, 200);
          },
          async (error) => {
            await this.getEventsOfYear2A(userProm2A);
            this.stateSpinner = 'hidden';
            setTimeout(() => { this.displaySpinner = false; }, 200);
          }
        );
    }
  }

  getImagesRestrictedGalleries() {
    // Only the slugs of the events are currently stored.
    // We therefore look for thumbnails and names
    for (let event = 0; event < this.galeriesEvents.length; event++) {
      this.getImage(this.galeriesEvents[event])
      .subscribe(
        (res: { gallery, thumbnail }) => {
          const requestGallery = res.gallery;
          this.galeriesEvents[event] = {
            name: requestGallery.name,
            slug: requestGallery.slug,
            image: res.thumbnail,
          };
        },
        (error) => { }
      );
    }
  }
}
