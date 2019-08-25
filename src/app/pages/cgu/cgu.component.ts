import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {

  articles = [];
  routes = routesAppFromRoot;
  phrases: object;

  constructor(private authService: AuthService) {
    this.phrases = Phrases;
  }

  ngOnInit() {
    // Initial request for getting all the articles and storing them in "articles"
    this.authService.getCGU().subscribe(
      (res: { articles }) => {
        const len = Object.keys(res.articles).length;
        for (let i = 1; i < len + 1; i++) {
          this.articles.push(res.articles[i]);
        }
      },
      (error) => { console.error(error); }
    );
  }
}
