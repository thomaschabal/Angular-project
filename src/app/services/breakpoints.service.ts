import { Injectable, HostListener } from '@angular/core';

import { BREAKPOINTS } from '../Constants';

@Injectable()
export class BreakpointsService {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  isTabletOrAbove: boolean;

  constructor() {
    this.initialBreakpoints();
  }

  initialBreakpoints() {
    const width = window.innerWidth;
    this.isMobile = width <= BREAKPOINTS.SMALL;
    this.isTablet = width > BREAKPOINTS.SMALL && width <= BREAKPOINTS.MEDIUM;
    this.isDesktop = width > BREAKPOINTS.MEDIUM;
    this.isMobileOrTablet = this.isMobile || this.isTablet;
    this.isTabletOrAbove = !this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    this.isMobile = width <= BREAKPOINTS.SMALL;
    this.isTablet = width > BREAKPOINTS.SMALL && width <= BREAKPOINTS.MEDIUM;
    this.isDesktop = width > BREAKPOINTS.MEDIUM;
    this.isMobileOrTablet = this.isMobile || this.isTablet;
    this.isTabletOrAbove = !this.isMobile;
  }
}
