import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

  @Input() route: string;
  @Input() imgSrc?: string;
  @Input() name: string;
  @Input() noFill = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
