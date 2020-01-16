import { Component, OnInit } from '@angular/core';
import { LINKS } from '../../Constants';

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
