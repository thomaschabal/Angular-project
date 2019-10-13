import { Injectable } from '@angular/core';

import { GaleriesService } from './galeries.service';

@Injectable()
export class PicsService {

  currentGallery: string;
  pics: any[];
  rawPics: any[];
  fullSizeLoadedPics: any[];
  requestStartedForPics: any[];
  allPicturesLoaded = false;

  constructor(private galeriesService: GaleriesService) { }

  initRawPics() {
    if (!this.allPicturesLoaded) {
      this.rawPics = [];
      this.fullSizeLoadedPics = [];
      this.requestStartedForPics = [];
      for (const pic of this.pics) {
        this.rawPics.push(pic.base64);
        this.fullSizeLoadedPics.push(false);
        this.requestStartedForPics.push(false);
      }
    }
  }

  onChangeCurrentGallery(newCurrentGallery: string) {
    this.currentGallery = newCurrentGallery;
    this.pics = [];
    this.rawPics = [];
    this.allPicturesLoaded = false;
  }

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
    const picPrevPrev = (i <= 1 ? i - 2 + nbPics : i - 2);
    const picPrev = (i <= 0 ? i - 1 + nbPics : i - 1);
    const picNext = (i + 1 >= nbPics ? (i + 1) - nbPics : i + 1);
    const picNextNext = (i + 2 >= nbPics ? (i + 2) - nbPics : i + 2);

    await this.getSingleFullImage(i);
    await this.getSingleFullImage(picNext);
    await this.getSingleFullImage(picPrev);
    await this.getSingleFullImage(picNextNext);
    await this.getSingleFullImage(picPrevPrev);

    return Promise.resolve();
  }

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
}
