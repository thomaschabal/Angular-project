import { Component, OnInit } from '@angular/core';

import { LINKS } from '../../../Constants';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss']
})
export class AuthFooterComponent implements OnInit {
  links = LINKS;

  constructor() {
  }

  ngOnInit() {
  }

}
