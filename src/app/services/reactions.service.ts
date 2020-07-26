import { Injectable } from '@angular/core';

import { HttpService } from '@src/app/services/http.service';
import API_ROUTES from '@src/app/services/Api';
import { PicsService } from '@src/app/services/pics.service';
import { REACTIONS } from '@src/app/constants/Reactions';
import { FavoritePic, Reaction, GetRandomUserReactionsResponse, GetAllUserReactionsResponse } from '@src/app/types/reactions.types';

const DEFAULT_PAGE_SIZE = 15;
const HOME_PAGE_FAVORITE_PICS_SIZE = 6;

@Injectable()
export class ReactionsService {
  homeFavoritePics: FavoritePic[];
  page = 1;
  crushesPics: FavoritePic[];
  numberOfReactions: number;
  isLoadingFirstPics = true;
  isLoadingMorePics = false;

  constructor(
    private httpService: HttpService,
    private picsService: PicsService
  ) {
    this.initCrushesPage();
    this.initHomeLovePics();
  }

  initHomeLovePics() {
    this.homeFavoritePics = [];
  }

  initCrushesPage() {
    this.page = 1;
    this.crushesPics = [];
  }

  updateReaction(reaction: Reaction, imageSlug: string) {
    return this.httpService
      .post(API_ROUTES.updateReaction, { reaction, image_slug: imageSlug })
      .toPromise();
  }

  // HOME PAGE
  getRandomUserReactions() {
    return this.httpService
      .post(API_ROUTES.getRandomUserReactions, {
        number_of_pics: HOME_PAGE_FAVORITE_PICS_SIZE
      })
      .toPromise();
  }

  getHomeLovePics() {
    this.getRandomUserReactions().then(
      (res: GetRandomUserReactionsResponse) => {
        const { reactions } = res;
        this.homeFavoritePics = reactions;
      },
      error => {
        console.error(error);
      }
    );
  }

  // CRUSHES PAGE
  getAllUserReactions(page: number) {
    return this.httpService
      .post(API_ROUTES.getAllUserReactions, {
        page,
        page_size: DEFAULT_PAGE_SIZE
      })
      .toPromise();
  }

  loadFirstCrushPics() {
    this.initCrushesPage();
    this.isLoadingFirstPics = true;
    this.getAllUserReactions(this.page).then(
      (res: GetAllUserReactionsResponse) => {
        const { number_of_reactions, reactions } = res;
        this.crushesPics = reactions;
        this.numberOfReactions = number_of_reactions;
        this.isLoadingFirstPics = false;
        this.page++;
        this.picsService.initGalleryPics(number_of_reactions);
        this.picsService.numberOfPics = this.numberOfReactions;
        this.picsService.rawPics = Array(this.numberOfReactions);
        this.picsService.pics = reactions;
        for (const reaction of reactions) {
          this.picsService.rawPics[reactions.indexOf(reaction)] = reaction.image;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  loadMoreCrushPics() {
    if (!this.isLoadingMorePics && (this.page - 1) * DEFAULT_PAGE_SIZE < this.numberOfReactions) {
      this.isLoadingMorePics = true;
      this.getAllUserReactions(this.page).then(
        (res: GetAllUserReactionsResponse) => {
          const { reactions } = res;
          this.crushesPics = this.crushesPics.concat(reactions);
          this.isLoadingMorePics = false;
          this.picsService.pics = this.crushesPics;
          for (const reaction of reactions) {
            this.picsService.rawPics[(this.page - 1) * DEFAULT_PAGE_SIZE + reactions.indexOf(reaction)] = reaction.image;
          }
          this.page++;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  // ICONS
  getIconFromReaction = (reactionType: Reaction, isSelected = false) => {
    if (reactionType === null) {
      return;
    }
    const icons = REACTIONS.filter(reaction => reaction.name === reactionType)[0];
    return isSelected ? icons.iconFull : icons.iconEmpty;
  }
}
