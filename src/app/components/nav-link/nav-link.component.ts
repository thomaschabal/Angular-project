import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

  @Input() route: string;
  @Input() imgSrc: string;
  @Input() name: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Display logos instead of text on smartphones
  isNarrowWindow() {
    return (window.innerWidth <= 736);
  }
}
