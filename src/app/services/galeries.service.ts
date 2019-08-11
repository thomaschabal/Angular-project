import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleriesService {
  galeriesEvents: any[];

  eventPics: any[];

  pic: any;

  constructor(private httpService: HttpService,
              private httpClient: HttpClient) {
    // Request to get the list of all public events
    const requestResult = httpService.get('/api/get-all-galleries')
    .subscribe(
      (res: { galleries }) => {
        this.galeriesEvents = res.galleries;
      },
      (error) => { }
    );
  }

  // Delete an event
  deleteEvent(event: string) {
    return this.httpService.delete('/api/galleries/' + event);
  }

  // Get the image associated to some event
  getEventByName(event: string) {
    return this.httpService.post('/api/get-images/' + event, {'image-slug': event});
  }

  // Get the list of all events
  getAllEvents() {
    return this.httpService.get('/api/get-all-galleries');
  }

  getEventsOfYear(year: string) {
    return this.httpService.get('/api/get-galleries-of-year/' + year);
  }

  // Get the list of all private events
  getPrivateEvents() {
    return this.httpService.get('/api/get-private-galleries');
  }

  // Get a random image for some event
  getImage(event: string) {
    return this.httpService.get('/api/get-random-image/' + event);
  }

  // Turn a gallery to private
  makePrivate(slug: string) {
    return this.httpService.post('/api/galleries/makeprivate', {gallery_slugs: [slug]});
  }

  // Turn a gallery to public
  makePublic(slug: string) {
    return this.httpService.post('/api/galleries/makepublic', {gallery_slugs: [slug]});
  }

  // Get the full picture (not the thumbnail) associated to some path
  getFullImage(path: string) {
    return this.httpService.post('/api/get-full-image', {file_path: path});
  }

  //// DASHBOARD METHODS
  postEvent(event: any) {
    return this.httpService.post('/api/create-gallery', event);
  }

  getModerationFiles() {
    return this.httpService.get('/api/files/not-moderated');
  }
}
