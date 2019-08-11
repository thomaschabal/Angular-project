import { Component, OnInit, Input } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';

import { GaleriesContactFormComponent } from '../galeries-contact-form/galeries-contact-form.component';

@Component({
  selector: 'app-galeries-footer',
  templateUrl: './galeries-footer.component.html',
  styleUrls: ['./galeries-footer.component.scss'],
  animations: [
    trigger('footerTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(2vh)'})),
      state('hidden', style({opacity : 0})),
      transition('* => *', [ animate('200ms') ] ),
    ])
  ]
})
export class GaleriesFooterComponent implements OnInit {

  @Input() nameEvent: string;
  @Input() resumeEvent: string;
  footerState = 'hidden';

  constructor() { }

  ngOnInit() {
  }

  changeStateFooter() {
    if (this.footerState === 'hidden') {
      this.footerState = 'visible';
    } else {
      this.footerState = 'hidden';
    }
  }
}
