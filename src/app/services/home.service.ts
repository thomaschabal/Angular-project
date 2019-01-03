import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
  last_events = [
    {
      name : "Le WEI",
      resume : "Du 29 Août au 2 Septembre dernier avait lieu le WEI des Ponts. En voici quelques souvenirs immortalisés par nos appareils.",
      routing : "wei2017",
      event_id : "one",
      next_event_id : "two",
      fond : "../../assets/images/wei.jpg"
    },
    {
      name : "Sup'Ponts'Héros",
      resume : "Récapitulatif de l'évènement sportif le plus marquant de l'année, qui avait lieu cette année à domicile. Supaéro n'est pas prêt de s'en remettre...",
      routing : "sport",
      event_id : "two",
      next_event_id : "three",
      fond : "../../assets/images/supponts.jpg"
    },
    {
      name : "Les voyages",
      resume : "Les Ponts ont beaucoup voyagé cette année, de Bruxelles à Budapest en passant par Dunkerque, Super Devoluy et Amsterdam.",
      routing : "voyage",
      event_id : "three",
      next_event_id : "coeur",
      fond : "../../assets/images/voyage1.jpg"
    }
  ];

  love_pics = [
    {
      title : "Rugby",
      address : "./assets/images/sport4.jpg"
    },
    {
      title : "OB de Février",
      address : "./assets/images/art_2018/5.jpg"
    },
    {
      title : "Sushis à la Skult",
      address : "./assets/images/skult/21.JPG"
    },
    {
      title : "Dimanche de lancement de campagne BDE",
      address : "./assets/images/dim_camp_2017/14.JPG"
    },
    {
      title : "Club Rock 2018",
      address : "./assets/images/rock2018/5.jpg"
    },
    {
      title : "Nuit de la Rentrée 2017",
      address : "./assets/images/soiree2.jpg"
    }
  ];

  constructor (private httpClient : HttpClient) {}

  ngOnInit () {
    this.postLastEvents();
    this.getLastEvents();
  }

  postLastEvents () {
    this.httpClient.post('https://http-client-ponthe.firebaseio.com/last_events.json', this.last_events)
    .subscribe(
      () => { console.log('Enregistrement terminé.'); },
      (error) => { console.log('Erreur à l\'enregistrement : ' + error); }
    );
  }

  getLastEvents () {
    this.httpClient.get<any[]>('https://http-client-ponthe.firebaseio.com/last_events.json', this.last_events)
    .subscribe(
      (response) => { this.last_events = response; },
      (error) => { console.log('Erreur à la récupération des évènements : ' + error);}
    );
  }
}
