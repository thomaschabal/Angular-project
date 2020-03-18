import { Component, OnInit, Input } from '@angular/core';
import { state, trigger, style, transition } from '@angular/animations';

import { routesAppFromRoot, photosSubpath, videosSubpath } from '../../../Routes';
import { LINKS } from '../../../Constants';

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

  constructor() {
  }

  ngOnInit() {
  }

  changeStateFooter() {
    this.footerState = (this.footerState === 'hidden' ? 'visible' : 'hidden');
  }

  getFooterTitleRedirection() {
    const currentUrl = window.location.pathname.split('/');
    const currentGalleryType = currentUrl[currentUrl.length - 2];
    if (currentGalleryType === photosSubpath) {
      return routesAppFromRoot.pics;
    } else if (currentGalleryType === videosSubpath) {
      return routesAppFromRoot.videos;
    }
    return routesAppFromRoot.galeries;
  }
}
