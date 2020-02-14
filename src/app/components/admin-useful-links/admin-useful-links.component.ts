import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import USEFUL_LINKS from '../../constants/UsefulLinks';

@Component({
  selector: 'app-admin-useful-links',
  templateUrl: './admin-useful-links.component.html',
  styleUrls: ['./admin-useful-links.component.scss']
})
export class AdminUsefulLinksComponent implements OnInit {
  usefulLinks = Object.keys(USEFUL_LINKS).map(key => USEFUL_LINKS[key]);
  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.next();
  }

}
