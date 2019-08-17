import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {

  @Input() name: string;
  @Input() address: string;

  constructor() { }

  ngOnInit() {
  }

  // Navigation to a given url
  navigateToAddress(url: string) {
    window.location.href = url;
  }
}
