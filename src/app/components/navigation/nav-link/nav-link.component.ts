import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { BREAKPOINTS } from '../../../Constants';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

  @Input() route: string;
  @Input() imgSrc: string;
  @Input() name: string;

  constructor(private router: Router,
              public breakpointsService: BreakpointsService) { }

  ngOnInit() {
  }
}
