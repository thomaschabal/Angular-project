import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import API_ROUTES from './Api';

const DEFAULT_PAGE_SIZE = 15;
const HOME_PAGE_FAVORITE_PICS_SIZE = 6;

enum Reaction {
    NONE = 1,
    LIKE = 2,
    DISLIKE = 3,
    LOVE = 4,
    HAPPY = 5,
    SAD = 6,
}

export interface FavoritePic {
    reaction: Reaction;
    name: string;
    image: string;
}


@Injectable()
export class ReactionsService {
    reactionsPics: FavoritePic[];
    homeFavoritePics: FavoritePic[];
    page = 1;

  constructor(private httpService: HttpService) {
      this.initReactionsPage();
  }

  initReactionsPage() {
      this.page = 1;
      this.reactionsPics = [];
  }

  updateReaction(reaction: Reaction, imageSlug: string) {
      return this.httpService.post(API_ROUTES.updateReaction, { reaction, image_slug: imageSlug });
  }

  getRandomUserReactions() {
    return this.httpService.post(API_ROUTES.getRandomUserReactions, { number_of_pics: HOME_PAGE_FAVORITE_PICS_SIZE })
        .toPromise();
  }

  getHomeLovePics() {
    this.getRandomUserReactions()
        .then(
        (res: { reactions: FavoritePic[] }) => {
            this.homeFavoritePics = res.reactions;
            console.log(this.homeFavoritePics);
        },
        (error) => { console.error(error); }
    );
  }

  getAllUserReactions(page: number) {
    return this.httpService.post(API_ROUTES.getAllUserReactions, { page, page_size: DEFAULT_PAGE_SIZE });
  }
}
