import { Component, OnInit } from '@angular/core';

export const LINKS = [
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

@Component({
  selector: 'app-icon-links',
  templateUrl: './icon-links.component.html',
  styleUrls: ['./icon-links.component.scss']
})
export class IconLinksComponent implements OnInit {
  links = LINKS;

  constructor() { }

  ngOnInit() {
  }

}
