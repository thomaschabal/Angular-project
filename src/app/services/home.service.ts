import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable()
export class HomeService {
  lovePics = [
    {
      title : 'Rugby',
      address : './assets/images/sport4.jpg'
    },
    {
      title : 'OB de Février',
      address : './assets/images/art_2018/5.jpg'
    },
    {
      title : 'Sushis à la Skult',
      address : './assets/images/skult/21.JPG'
    },
    {
      title : 'Dimanche de lancement de campagne BDE',
      address : './assets/images/dim_camp_2017/14.JPG'
    },
    {
      title : 'Club Rock 2018',
      address : './assets/images/rock2018/5.jpg'
    },
    {
      title : 'Nuit de la Rentrée 2017',
      address : './assets/images/soiree2.jpg'
    }
  ];

  constructor(private httpService: HttpService) {}

  getLatestGalleries() {
    return this.httpService.post('/api/get-latest-galleries', {page: 1, page_size: 3});
  }
}
