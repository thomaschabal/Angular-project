import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { ReactionsService } from './reactions.service';
import API_ROUTES from './Api';
import { NUMBER_OF_LAST_EVENTS_HOME } from '../Constants';
import { PicsService } from './pics.service';
import { GetRandomUserReactionsResponse, FavoritePic } from '../types/reactions.types';
import { LastEvent, GetLatestGalleriesResponse } from '../types/home.types';

const EMPTY_EVENT = {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''};

@Injectable()
export class HomeService {
  lastEvents: LastEvent[] = [];
  areLastEventsLoaded = false;
  lovePics: FavoritePic[] = [];
  areLovePicsLoaded = false;

  constructor(private httpService: HttpService,
              private reactionsService: ReactionsService,
              private picsService: PicsService) {}

  getLatestGalleries() {
    return this.httpService.post(API_ROUTES.getLatestGalleries, { page: 1, page_size: NUMBER_OF_LAST_EVENTS_HOME })
      .subscribe(
        (res: GetLatestGalleriesResponse) => {
          const { galleries } = res;
          this.lastEvents = Array(galleries.length).fill(EMPTY_EVENT);
          const idEvents = ['one', 'two', 'three', 'coeur'];
          for (let i = 0; i < galleries.length; i++) {
            this.lastEvents[i] = {
              name: galleries[i].name,
              fond: galleries[i].image,
              routing: galleries[i].slug,
              event_id: idEvents[i],
              next_event_id: idEvents[i + 1],
              resume: galleries[i].description,
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
        (res: GetRandomUserReactionsResponse) => {
            const { reactions } = res;
            this.lovePics = reactions;
            this.areLovePicsLoaded = true;
            this.picsService.rawPics = reactions.map(pic => pic.image);
            this.picsService.numberOfPics = reactions.length;
            if (this.picsService.currentGallery === '') {
              this.picsService.pics = this.lovePics;
              this.picsService.rawPics = this.lovePics.map(pic => pic.image);
              this.picsService.numberOfPics = this.lovePics.length;
            }
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
