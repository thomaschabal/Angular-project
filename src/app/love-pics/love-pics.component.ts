import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-love-pics',
  templateUrl: './love-pics.component.html',
  styleUrls: ['./love-pics.component.scss']
})
export class LovePicsComponent implements OnInit {

  @Input() name : string;
  @Input() address : string;
  @Input() index_placement : number;

  constructor() { }

  ngOnInit() {
  }

  placement() {
    if (this.index_placement%2 === 0) {
      return "from-left";
    } else {
      return "from-right";
    }
  }

}
