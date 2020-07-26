import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.tns.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class InfiniteScrollComponent implements OnInit {
  @Input() reloadFn: () => void;

  @ViewChild('bottomAnchor') view: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  handleScroll(event: any) {
    const NUMBER_CARDS_FOR_RELOAD = 7;

    const cardSize = event.object.getActualSize().height;
    const bottomY = this.view.nativeElement.getLocationInWindow().y;
    const boundaryReload = bottomY - (NUMBER_CARDS_FOR_RELOAD - 2) * cardSize;

    if (boundaryReload < 0) {
      this.reloadFn();
    }
  }
}
