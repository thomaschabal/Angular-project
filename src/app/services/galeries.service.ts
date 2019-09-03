import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleriesService {
  galeriesEvents: any[];
  privateGalleries: any[];
  eventPics: any[];
  pic: any;

  constructor(private httpService: HttpService) {
      // Request to get the list of all public events
      httpService.get('/get-all-galleries').subscribe(
        (res: { galleries }) => {
          this.galeriesEvents = res.galleries;
        },
        (error) => { }
      );
      this.getPrivateEvents().subscribe(
        (res: {galleries}) => {
          this.privateGalleries = res.galleries;
        }
      );
    }

  // Determine whether the gallery is public or private
  isPublicOrPrivate(routeGallery: string) {
    let isPublic = true;
    for (const event of this.privateGalleries) {
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
    return this.httpService.get('/get-all-galleries');
  }

  getEventsOfYear(year: string) {
    return this.httpService.get('/get-galleries-of-year/' + year);
  }

  // Get the list of all private events
  getPrivateEvents() {
    return this.httpService.get('/get-private-galleries');
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
}
