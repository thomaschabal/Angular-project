import { Injectable } from '@angular/core';

import { GaleriesService } from './galeries.service';

@Injectable()
export class PicsService {

  currentGallery: string;
  pics: any[];
  rawPics: any[];
  fullSizeLoadedPics: any[];
  allPicturesLoaded = false;

  constructor(private galeriesService: GaleriesService) { }

  initRawPics() {
    if (!this.allPicturesLoaded) {
      this.rawPics = [];
      this.fullSizeLoadedPics = [];
      for (const pic of this.pics) {
        this.rawPics.push(pic.base64);
        this.fullSizeLoadedPics.push(false);
      }
      this.loadFullImage(0);
    }
  }

  onChangeCurrentGallery(newCurrentGallery: string) {
    this.currentGallery = newCurrentGallery;
    this.pics = [];
    this.rawPics = [];
    this.allPicturesLoaded = false;
  }

  loadFullImage(i: number) {
    if (!this.allPicturesLoaded) {
      if (!this.fullSizeLoadedPics[i]) {
        this.galeriesService.getFullImage(this.pics[i].file_path)
        .subscribe(
          (res: { base64 }) => {
            this.rawPics[i] = res.base64;
            this.fullSizeLoadedPics[i] = true;
            this.areAllPicturesLoaded();
            if (i + 1 < this.rawPics.length) {
              this.loadFullImage(i + 1);
            } else {
              this.loadFullImage(0);
            }
          },
          (error) => { console.error(error); }
        );
      } else {
        if (i + 1 < this.rawPics.length) {
          this.loadFullImage(i + 1);
        } else {
          this.loadFullImage(0);
        }
      }
    }
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
