import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  last_events : any[];
  love_pics : any[];
  adresse_1 : string;
  adresse_2 : string;
  adresse_3 : string;

  constructor(private homeService : HomeService) { };

  ngOnInit() {
    this.last_events = this.homeService.last_events;
    this.love_pics = this.homeService.love_pics;
  }

}
