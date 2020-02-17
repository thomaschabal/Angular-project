import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthCardComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }
}
