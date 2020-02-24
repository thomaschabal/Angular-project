import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { ReactionsService, FavoritePic } from './reactions.service';
import API_ROUTES from './Api';
import { LOVE_PICS, NUMBER_OF_LAST_EVENTS_HOME } from '../Constants';
import { PicsService } from './pics.service';

const EMPTY_EVENT = {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''};

@Injectable()
export class HomeService {
  lastEvents = [];
  areLastEventsLoaded = false;
  lovePics: FavoritePic[];
  areLovePicsLoaded = false;

  constructor(private httpService: HttpService,
              private reactionsService: ReactionsService,
              private picsService: PicsService) {}

  getLatestGalleries() {
    return this.httpService.post(API_ROUTES.getLatestGalleries, { page: 1, page_size: NUMBER_OF_LAST_EVENTS_HOME })
      .subscribe(
        (res: { galleries }) => {
          this.lastEvents = Array(res.galleries.length).fill(EMPTY_EVENT);
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
    this.reactionsService.getRandomUserReactions()
        .then(
        (res: { reactions: FavoritePic[] }) => {
            this.lovePics = res.reactions;
            this.areLovePicsLoaded = true;
            this.picsService.rawPics = res.reactions.map(pic => pic.image);
            this.picsService.numberOfPics = res.reactions.length;
        },
        (error) => { console.error(error); }
    );
  }

  loadLovePics() {
    if (!this.areLovePicsLoaded) {
      this.getLovePics();
    }
  }

  initHomePage() {
    this.loadLatestGalleries();
    this.loadLovePics();
  }
}
