import { Injectable } from '@angular/core';

import { GaleriesService, DEFAULT_PAGE_SIZE } from './galeries.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PicsService {

  currentGallery: string;

  pics: any[];
  picsSource = new BehaviorSubject([])
  picsStream = this.picsSource.asObservable();

  numberOfPics: number;
  page = 1;

  isLoadingMore = false;
  isLoadingMoreSource = new BehaviorSubject(false);
  isLoadingMoreStream = this.isLoadingMoreSource.asObservable();

  rawPics: any[];
  fullSizeLoadedPics: any[];
  requestStartedForPics: any[];
  allPicturesLoaded = false;

  constructor(private galeriesService: GaleriesService) { }

  updatePics() {
    this.picsSource.next(this.pics);
  }
  updateIsLoadingMore(loading: boolean) {
    this.isLoadingMore = loading;
    this.isLoadingMoreSource.next(loading);
  }

  // GALLERY INITIALIZATION

  initGalleryPics(numberOfPics: number = 0) {
    this.numberOfPics = numberOfPics;
    this.rawPics = Array(numberOfPics);
    this.fullSizeLoadedPics = Array(numberOfPics);
    this.requestStartedForPics = Array(numberOfPics);
    this.allPicturesLoaded = false;
    this.page = 1;
    this.updateIsLoadingMore(false);
  }

  onReceivePic(pic: any, index: number) {
    this.rawPics[index] = pic.base64;
    this.fullSizeLoadedPics[index] = false;
    this.requestStartedForPics[index] = false;
  }

  initRawPics(numberOfPics: number) {
    if (!this.allPicturesLoaded) {
      this.initGalleryPics(numberOfPics);
      for (const pic of this.pics) {
        this.onReceivePic(pic, this.pics.indexOf(pic));
      }
    }
  }

  onChangeCurrentGallery(newCurrentGallery: string) {
    this.currentGallery = newCurrentGallery;
    this.initGalleryPics();
  }

  // GET FULL IMAGES

  getSingleFullImage(index: number) {
    if (!this.allPicturesLoaded
        && !this.fullSizeLoadedPics[index]
        && !this.requestStartedForPics[index]) {
      this.requestStartedForPics[index] = true;
      return this.galeriesService.getFullImage(this.pics[index].file_path)
      .toPromise()
      .then(
        (res: { base64 }) => {
          this.rawPics[index] = res.base64;
          this.fullSizeLoadedPics[index] = true;
          this.areAllPicturesLoaded();
        },
        (error) => { console.error(error); }
      );
    }
  }

  loadFullImage = async (i: number) => {
    // Load pics i, i-1 and i+1 (except if they are already loaded)
    const nbPics = this.fullSizeLoadedPics.length;
    const picPrev = (i <= 0 ? i - 1 + nbPics : i - 1);
    const picNext = (i + 1 >= nbPics ? (i + 1) - nbPics : i + 1);

    if (this.rawPics[i + 5] === undefined) {
      this.loadMorePics();
    }

    await this.getSingleFullImage(i);
    if (i > 0) {
      await this.getSingleFullImage(picPrev);
    }
    if (i < this.numberOfPics) {
      await this.getSingleFullImage(picNext);
    }

    return Promise.resolve();
  }

  // CHECKING

  areAllPicturesLoaded() {
    if (!this.allPicturesLoaded) {
      let varAllPicturesLoaded = true;
      for (const picLoaded of this.fullSizeLoadedPics) {
        if (picLoaded) {
          varAllPicturesLoaded = false;
        }
      }
      this.allPicturesLoaded = varAllPicturesLoaded;
    }
  }

  // LOAD MORE PICS OF THE GALLERY

  addFollowingLoadedImages(newPics: any[], page: number) {
    for (const pic of newPics) {
      this.pics.push(pic);
      this.onReceivePic(pic, page * DEFAULT_PAGE_SIZE + newPics.indexOf(pic));
    }
  }

  loadMorePics() {
    if (this.page * DEFAULT_PAGE_SIZE < this.numberOfPics && !this.isLoadingMore) {
      this.updateIsLoadingMore(true);
      this.galeriesService.getEventByName(this.currentGallery, this.page + 1)
        .subscribe(
          (res: {files, gallery}) => {
            this.addFollowingLoadedImages(res.files, this.page);
            this.page ++;
            this.updateIsLoadingMore(false);
            this.updatePics();
          },
          (error) => { }
        );
    }
  }
}
