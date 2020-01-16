import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { LOVE_PICS, NUMBER_OF_LAST_EVENTS_HOME } from '../Constants';
import API_ROUTES from './Api';

const EMPTY_EVENT = {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''};

@Injectable()
export class HomeService {
  lastEvents = Array(NUMBER_OF_LAST_EVENTS_HOME).fill(EMPTY_EVENT);
  areLastEventsLoaded = false;
  lovePics: any;
  areLovePicsLoaded = false;
  lovePicsSrc: any;

  constructor(private httpService: HttpService) {}

  getLatestGalleries() {
    return this.httpService.post(API_ROUTES.getLatestGalleries, { page: 1, page_size: NUMBER_OF_LAST_EVENTS_HOME })
      .subscribe(
        (res: { galleries }) => {
          const lastEvents = res.galleries;
          const idEvents = ['one', 'two', 'three', 'coeur'];
          for (let i = 0; i < lastEvents.length; i++) {
            this.lastEvents[i] = {
              name: lastEvents[i].name,
              fond: lastEvents[i].image,
              routing: lastEvents[i].slug,
              event_id: idEvents[i],
              next_event_id: idEvents[i + 1],
              resume: lastEvents[i].description,
            };
          }
          this.areLastEventsLoaded = true;
        },
        (error) => { console.error(error); }
      );
  }

  loadLatestGalleries() {
    if (!this.areLastEventsLoaded) {
      this.getLatestGalleries();
    }
  }

  getLovePics() {
    this.lovePics = LOVE_PICS;
    this.lovePicsSrc = Object.assign({}, this.lovePics);
    Object.keys(this.lovePicsSrc).map(
      (key, pic) => { this.lovePicsSrc[key] = this.lovePicsSrc[key].address; }
    );
    this.areLovePicsLoaded = true;
  }

  loadLovePics() {
    if (!this.areLovePicsLoaded) {
      this.getLovePics();
    }
  }
}
