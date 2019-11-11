import { Component, OnInit, Input } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';

import { routesAppFromRoot } from '../../Routes';
import { LINKS } from '../icon-links/icon-links.component';

@Component({
  selector: 'app-galeries-footer',
  templateUrl: './galeries-footer.component.html',
  styleUrls: ['./galeries-footer.component.scss'],
  animations: [
    trigger('footerTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(2vh)'})),
      state('hidden', style({opacity : 0})),
      transition('* => *', [] ),
    ])
  ]
})
export class GaleriesFooterComponent implements OnInit {
  links = LINKS;
  @Input() nameEvent: string;
  @Input() resumeEvent: string;
  footerState = 'hidden';
  routes = routesAppFromRoot;

  constructor() {
  }

  ngOnInit() {
  }

  changeStateFooter() {
    this.footerState = (this.footerState === 'hidden' ? 'visible' : 'hidden');
  }
}
