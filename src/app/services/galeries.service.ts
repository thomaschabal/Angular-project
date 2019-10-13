import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

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
    return this.httpService.delete('/galleries/' + event);
  }

  // Get the image associated to some event
  getEventByName(event: string) {
    return this.httpService.post('/get-images/' + event, {'image-slug': event});
  }

  // Get the list of all events
  getAllEvents() {
    if (!this.areGaleriesEventsLoaded && this.httpService.isAdmin) {
      return this.httpService.get('/get-all-galleries')
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
    return this.httpService.get('/get-galleries-of-year/' + year);
  }

  // Get the list of all private events
  getPrivateEvents() {
    if (this.httpService.isAdmin === true && !this.arePrivateEventsLoaded) {
      return this.httpService.get('/get-private-galleries')
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
    return this.httpService.get('/get-random-image/' + event);
  }

  // Turn a gallery to private
  makePrivate(slug: string) {
    return this.httpService.post('/galleries/makeprivate', {gallery_slugs : [slug]});
  }

  // Turn a gallery to public
  makePublic(slug: string) {
    return this.httpService.post('/galleries/makepublic', {gallery_slugs : [slug]});
  }

  // Get the full picture (not the thumbnail) associated to some path
  getFullImage(path: string) {
    return this.httpService.post('/get-full-image', {file_path : path});
  }

  //// DASHBOARD METHODS
  postEvent(event: any) {
    return this.httpService.post('/create-gallery', event);
  }

  getModerationFiles() {
    return this.httpService.get('/files/not-moderated');
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
