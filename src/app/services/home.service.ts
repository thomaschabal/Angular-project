import { Injectable } from '@angular/core';

import { HttpService } from '@src/app/services/http.service';
import { ReactionsService } from '@src/app/services/reactions.service';
import API_ROUTES from '@src/app/services/Api';
import { NUMBER_OF_LAST_EVENTS_HOME } from '@src/app/Constants';
import { PicsService } from '@src/app/services/pics.service';
import { GetRandomUserReactionsResponse, FavoritePic } from '@src/app/types/reactions.types';
import { LastEvent, GetLatestGalleriesResponse, GalleryTypes } from '@src/app/types/home.types';
import { routesAppFromRoot } from '@src/app/Routes';

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
            const { name, image, slug, description, type } = galleries[i];
            this.lastEvents[i] = {
              name,
              fond: image,
              routing: slug,
              event_id: idEvents[i],
              next_event_id: idEvents[i + 1],
              resume: description,
              type,
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

  setLovePicsInPicsService(lovePics: FavoritePic[]) {
    this.picsService.rawPics = lovePics.map(pic => pic.image);
    this.picsService.numberOfPics = lovePics.length;
    if (this.picsService.currentGallery === '') {
      this.picsService.pics = this.lovePics;
      this.picsService.rawPics = this.lovePics.map(pic => pic.image);
      this.picsService.numberOfPics = this.lovePics.length;
    }
  }

  getLovePics() {
    this.reactionsService.getRandomUserReactions()
        .then(
        (res: GetRandomUserReactionsResponse) => {
            const { reactions } = res;
            this.lovePics = reactions;
            this.areLovePicsLoaded = true;
            this.setLovePicsInPicsService(reactions);
        },
        (error) => { console.error(error); }
    );
  }

  loadLovePics() {
    if (!this.areLovePicsLoaded) {
      this.getLovePics();
    } else {
      this.setLovePicsInPicsService(this.lovePics);
    }
  }

  initHomePage() {
    this.loadLatestGalleries();
    this.loadLovePics();
  }

  getEventRouting(event: LastEvent) {
    const { type, routing } = event;
    if (type === GalleryTypes.PHOTO) {
      return routesAppFromRoot.pics + '/' + routing;
    } else if (type === GalleryTypes.VIDEO) {
      return routesAppFromRoot.videos + '/' + routing;
    }
  }
}
