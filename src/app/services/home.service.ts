import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable()
export class HomeService {
  lastEvents = [
    {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''},
    {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''},
    {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''}
  ];
  areLastEventsLoaded = false;
  lovePics: any;
  areLovePicsLoaded = false;
  lovePicsSrc: any;

  constructor(private httpService: HttpService) {}

  getLatestGalleries() {
    return this.httpService.post('/get-latest-galleries', {page: 1, page_size: 3})
      .subscribe(
        (res: { galleries }) => {
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
    this.lovePics = [
      {
        title : 'Rugby',
        address : './assets/images/love_pics/sport4.jpg'
      },
      {
        title : 'OB de Février',
        address : './assets/images/love_pics/art_2018.jpg'
      },
      {
        title : 'Sushis à la Skult',
        address : './assets/images/love_pics/skult_sushis.JPG'
      },
      {
        title : 'Dimanche de lancement de campagne BDE',
        address : './assets/images/love_pics/dim_camp_2017.JPG'
      },
      {
        title : 'Club Rock 2018',
        address : './assets/images/love_pics/rock2018.jpg'
      },
      {
        title : 'Nuit de la Rentrée 2017',
        address : './assets/images/love_pics/soiree2.jpg'
      }
    ];
    this.lovePicsSrc = Object.assign({}, this.lovePics);
    Object.keys(this.lovePicsSrc).map(
      (key, pic) => { this.lovePicsSrc[key] = this.lovePicsSrc[key].address; }
    );
    this.areLovePicsLoaded = true;
  }

  loadLovePics() {
    if (!this.areLovePicsLoaded) {
      this.getLovePics();
    }
  }
}
