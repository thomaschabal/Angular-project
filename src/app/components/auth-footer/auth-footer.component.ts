import { Component, OnInit } from '@angular/core';
import { Phrases } from '../../Phrases';
import { LINKS } from '../icon-links/icon-links.component';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss']
})
export class AuthFooterComponent implements OnInit {
  phrases: object;
  links = LINKS;

  constructor() {
    this.phrases = Phrases;
  }

  ngOnInit() {
  }

}
