import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import API_ROUTES from './Api';
import { PicsService } from './pics.service';
import { REACTIONS } from 'src/app/constants/Reactions';

const DEFAULT_PAGE_SIZE = 15;
const HOME_PAGE_FAVORITE_PICS_SIZE = 6;

export enum Reaction {
  NONE = 'NONE',
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  LOVE = 'LOVE',
  HAPPY = 'HAPPY',
  SAD = 'SAD'
}

export interface FavoritePic {
  own_reaction: Reaction;
  name: string;
  file_path: string;
  image: string;
}

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
      (res: { reactions: FavoritePic[] }) => {
        this.homeFavoritePics = res.reactions;
        console.log(this.homeFavoritePics);
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
    this.getAllUserReactions(this.page).then(
      (res: { number_of_reactions: number, reactions: FavoritePic[] }) => {
        this.crushesPics = res.reactions;
        this.numberOfReactions = res.number_of_reactions;
        this.isLoadingFirstPics = false;
        this.page++;
        this.picsService.numberOfPics = this.numberOfReactions;
        this.picsService.rawPics = Array(this.numberOfReactions);
        this.picsService.pics = res.reactions;
        for (const reaction of res.reactions) {
          this.picsService.rawPics[res.reactions.indexOf(reaction)] = reaction.image;
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
        (res: { reactions: FavoritePic[] }) => {
          this.crushesPics = this.crushesPics.concat(res.reactions);
          this.isLoadingFirstPics = false;
          this.page++;
          this.isLoadingMorePics = false;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  // ICONS
  getIconFromReaction = (reactionType: Reaction, isSelected = false) => {
    const icons = REACTIONS.filter(reaction => reaction.name === reactionType)[0];
    return isSelected ? icons.iconFull : icons.iconEmpty;
  }
}
