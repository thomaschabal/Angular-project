export class GaleriesService {
  galeries_events = [
    {
      name : "Les voyages",
      routing : "voyage",
      image : "assets/images/voyage1.jpg"
    },
    {
      name : "La Nuit de la Rentrée 2017",
      routing : "ndlr2017",
      image : "assets/images/soiree2.jpg"
    },
    {
      name : "Les sports",
      routing : "sport",
      image : "assets/images/sport.jpg"
    },
    {
      name : "Le WEI 2017",
      routing : "wei2017",
      image : "assets/images/wei.jpg"
    },
    {
      name : "Bal des Ponts 2018",
      routing : "gala2018",
      image : "assets/images/gala/9.jpg"
    },
    {
      name : "Skult 2018",
      routing : "skult2018",
      image : "assets/images/skult/15.JPG"
    },
    {
      name : "Dimanche des campagnes 2017",
      routing : "dim_camp_2017",
      image : "assets/images/dim_camp_2017/16.JPG"
    },
    {
      name : "Art aux Ponts en 2018",
      routing : "arts2018",
      image : "assets/images/art_2018/5.jpg"
    },
    {
      name : "Club Rock 2018",
      routing : "rock2018",
      image : "assets/images/rock2018/1.JPG"
    }
  ];


  event_pics = [
    {
      name : "Les voyages",
      pics : ["assets/images/dam.jpg",
              "assets/images/voyage1.jpg",
              "assets/images/ski/1.jpg",
              "assets/images/ski/2.jpg",
              "assets/images/ski/3.jpg",
              "assets/images/ski/4.jpg",
              "assets/images/ski/5.jpg",
              "assets/images/ski/6.jpg",
              "assets/images/ski/7.jpg",
              "assets/images/ski/8.jpg",
              "assets/images/ski/9.jpg",
              "assets/images/ski/10.jpg",
              "assets/images/ski/11.jpg"
            ],
      resume : "Rappel des voyages effectués pendant l'année.",
      event : "voyage"
    },
    {
      name : "La Nuit de la Rentrée 2017",
      pics : ["assets/images/soiree1.jpg",
              "assets/images/soiree2.jpg",
              "assets/images/font1.jpg",
              "assets/images/font2.jpg",
              "assets/images/introP.jpg"
            ],
      resume : "La soirée inoubliable des Ponts, organisée par le Bitum et remémorée ici par les appareils du Ponthé.",
      event : "ndlr2017"
    },
    {
      name : "Les sports",
      pics : ["assets/images/sport1.jpg",
              "assets/images/sport.jpg",
              "assets/images/sport2.jpg",
              "assets/images/sport3.jpg",
              "assets/images/sport4.jpg",
              "assets/images/supponts.jpg",
              "assets/images/pom.jpg"
            ],
      resume : "Images des tournois sportifs auxquels participent les Ponts (Sup'Ponts, TOSS, Coupe de l'X et bien d'autres).",
      event : "sport"
    },
    {
      name : "Le WEI 2017",
      pics : ["assets/images/wei.jpg",
              "assets/images/wei2.jpg",
              "assets/images/wei3.jpg",
              "assets/images/wei4.jpg",
              "assets/images/wei5.jpg"
            ],
      resume : "Reportage photo en immersion au Wei des Ponts 2017 !",
      event : "wei2017"
    },
    {
      name : "Bal des Ponts 2018",
      pics : ["assets/images/gala/1.jpg",
              "assets/images/gala/2.jpg",
              "assets/images/gala/3.jpg",
              "assets/images/gala/4.jpg",
              "assets/images/gala/5.jpg",
              "assets/images/gala/6.jpg",
              "assets/images/gala/7.jpg",
              "assets/images/gala/8.jpg",
              "assets/images/gala/9.jpg",
              "assets/images/gala/10.jpg",
              "assets/images/gala/11.jpg",
              "assets/images/gala/12.jpg",
              "assets/images/gala/13.jpg",
              "assets/images/gala/14.jpg",
              "assets/images/gala/15.jpg",
              "assets/images/gala/16.jpg",
              "assets/images/gala/17.jpg",
              "assets/images/gala/18.jpg",
              "assets/images/gala/19.jpg",
              "assets/images/gala/20.jpg",
              "assets/images/gala/21.jpg",
              "assets/images/gala/22.jpg",
              "assets/images/gala/23.jpg",
              "assets/images/gala/24.jpg"
            ],
      resume : "Photos du concert du Bal des Ponts 2018, au Pavillon Cambon Capucines.",
      event : "gala2018"
    },
    {
      name : "Skult 2018",
      pics : ["assets/images/skult/1.JPG",
              "assets/images/skult/2.JPG",
              "assets/images/skult/3.JPG",
              "assets/images/skult/4.JPG",
              "assets/images/skult/5.JPG",
              "assets/images/skult/6.JPG",
              "assets/images/skult/7.JPG",
              "assets/images/skult/8.JPG",
              "assets/images/skult/9.JPG",
              "assets/images/skult/10.JPG",
              "assets/images/skult/11.JPG",
              "assets/images/skult/12.JPG",
              "assets/images/skult/13.JPG",
              "assets/images/skult/14.JPG",
              "assets/images/skult/15.JPG",
              "assets/images/skult/16.JPG",
              "assets/images/skult/17.JPG",
              "assets/images/skult/18.JPG",
              "assets/images/skult/19.JPG",
              "assets/images/skult/20.JPG",
              "assets/images/skult/21.JPG"
            ],
      resume : "Entre repas de Sushis, Fast and Curious, Buffet des Régions et Quizz des Familles, cette nouvelle édition de la Skult a été bien remplie ! A l'année prochaine pour de nouvelles aventures ;)",
      event : "skult2018"
    },
    {
      name : "Dimanche des campagnes 2017",
      pics : ["assets/images/dim_camp_2017/1.jpg",
              "assets/images/dim_camp_2017/2.jpg",
              "assets/images/dim_camp_2017/3.jpg",
              "assets/images/dim_camp_2017/4.jpg",
              "assets/images/dim_camp_2017/5.jpg",
              "assets/images/dim_camp_2017/6.jpg",
              "assets/images/dim_camp_2017/7.jpg",
              "assets/images/dim_camp_2017/8.jpg",
              "assets/images/dim_camp_2017/9.jpg",
              "assets/images/dim_camp_2017/10.jpg",
              "assets/images/dim_camp_2017/11.jpg",
              "assets/images/dim_camp_2017/12.jpg",
              "assets/images/dim_camp_2017/13.jpg",
              "assets/images/dim_camp_2017/14.jpg",
              "assets/images/dim_camp_2017/15.jpg",
              "assets/images/dim_camp_2017/16.jpg",
              "assets/images/dim_camp_2017/17.jpg",
              "assets/images/dim_camp_2017/18.jpg",
              "assets/images/dim_camp_2017/19.jpg",
              "assets/images/dim_camp_2017/20.jpg",
              "assets/images/dim_camp_2017/21.jpg",
              "assets/images/dim_camp_2017/22.jpg",
              "assets/images/dim_camp_2017/23.jpg"
            ],
      resume : "Quelques images du lancement de la campagne BDE 2017, avec l'accrochage des tentures de listes et la soirée Pipoterie 020.",
      event : "dim_camp_2017"
    },
    {
      name : "Art aux Ponts en 2018",
      pics : ["assets/images/art_2018/1.jpg",
              "assets/images/art_2018/2.jpg",
              "assets/images/art_2018/3.jpg",
              "assets/images/art_2018/4.jpg",
              "assets/images/art_2018/5.jpg",
              "assets/images/art_2018/6.jpg",
              "assets/images/art_2018/7.jpg",
              "assets/images/art_2018/8.jpg",
              "assets/images/art_2018/9.jpg",
              "assets/images/art_2018/10.jpg",
              "assets/images/art_2018/11.jpg",
              "assets/images/art_2018/12.jpg",
              "assets/images/art_2018/13.jpg",
              "assets/images/art_2018/14.jpg",
              "assets/images/art_2018/15.png"
            ],
      resume : "L'Ecole des Ponts est très sensible aux Arts, à travers ses chansons paillardes et ses danses du Limousin, mais pas que...",
      event : "arts2018"
    },
    {
      name : "Club Rock 2018",
      pics : ["assets/images/rock2018/1.JPG",
              "assets/images/rock2018/2.JPG",
              "assets/images/rock2018/3.jpg",
              "assets/images/rock2018/4.jpg",
              "assets/images/rock2018/5.jpg",
              "assets/images/rock2018/6.jpg"
            ],
      resume : "Quelques passes endiablées du club Rock qui ont marqué la vie des Ponts cette année.",
      event : "rock2018"
    }
  ];

  getEventByName(event : string) {
    const evenement = this.event_pics.find(
      (singleEvent) => { return singleEvent.event === event }
    );
    return evenement;
  }
}
