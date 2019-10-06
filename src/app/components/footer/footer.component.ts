import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { HttpService } from '../../services/http.service';
import { Phrases } from '../../Phrases';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  phrases: object;
  links = [
    {
      href: 'https://www.facebook.com/club.ponthe',
      class: 'fa-facebook',
      name: 'Facebook',
    },
    {
      href: 'https://upont.enpc.fr/assos/ponthe',
      class: 'fa-instagram',
      name: 'uPont',
    },
    {
      href: 'https://github.com/ENPC-Ponthe/Angular-project',
      class: 'fa-github',
      name: 'GitHub',
    },
    // {
    //   href: '#',
    //   class: 'fa-linkedin',
    //   name: 'LinkedIn',
    // },
    {
      href: 'mailto:ponthe@liste.enpc.fr',
      class: 'fa-envelope-o',
      name: 'Email',
    },
  ];

  constructor(private httpService: HttpService,
              private router: Router) {
    this.phrases = Phrases;
  }

  get isOnline() {
    return (
      (this.httpService.token !== null) &&
      !(this.router.url.includes('galeries')) &&
      !(this.router.url.includes('dashboard'))
    );
  }
}
