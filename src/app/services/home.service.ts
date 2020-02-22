import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { LOVE_PICS, NUMBER_OF_LAST_EVENTS_HOME } from '../Constants';
import API_ROUTES from './Api';

const EMPTY_EVENT = {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''};

@Injectable()
export class HomeService {
  lastEvents = [];
  areLastEventsLoaded = false;
  lovePics: any;
  areLovePicsLoaded = false;
  lovePicsSrc: any;

  constructor(private httpService: HttpService) {}

  getLatestGalleries() {
    return this.httpService.post(API_ROUTES.getLatestGalleries, { page: 1, page_size: NUMBER_OF_LAST_EVENTS_HOME })
      .subscribe(
        (res: { galleries }) => {
          this.lastEvents = Array(res.galleries.length).fill(EMPTY_EVENT);
          const lastEvents = res.galleries;
          // REMOVE FOLLOWING LINE WHEN LOVE PICS ARE IMPLEMENTED
          // const idEvents = ['one', 'two', 'three', 'coeur'];
          const idEvents = ['one', 'two', 'three', 'contact'];
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
    this.lovePicsSrc = Object.values(this.lovePics).map(
      (pic: any) => pic.address
    );
    this.areLovePicsLoaded = true;
  }

  loadLovePics() {
    if (!this.areLovePicsLoaded) {
      this.getLovePics();
    }
  }
}
