import { Component, OnInit } from '@angular/core';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss']
})
export class AuthFooterComponent implements OnInit {

  phrases: object;

  constructor() {
    this.phrases = Phrases;
  }

  ngOnInit() {
  }

}
