import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable()
export class HomeService {
  lastEvents = [
    {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''},
    {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''},
    {name: '', fond: '', routing: '', event_id: '', next_event_id: '', resume: ''}
  ];
  lovePics = [
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
  lovePicsSrc = Object.assign({}, this.lovePics);

  constructor(private httpService: HttpService) {
    Object.keys(this.lovePicsSrc).map(
      (key, pic) => { this.lovePicsSrc[key] = this.lovePicsSrc[key].address; }
    );
  }

  getLatestGalleries() {
    return this.httpService.post('/get-latest-galleries', {page: 1, page_size: 3});
  }
}
