import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

const DURATION_ANIMATION = 3500;
const NUMBER_PICS = 4;

@Component({
  selector: 'app-auth-bg-slider',
  templateUrl: './auth-bg-slider.component.html',
  styleUrls: ['./auth-bg-slider.component.scss'],
  animations : [
  trigger('backgroundAnimation', [
    transition('hidden => visible', [
      animate(DURATION_ANIMATION, keyframes([
        style({ opacity: 0, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 0.5, transform: 'translateX(-1%) scale(1)', offset: 0.1 }),
        style({ transform: 'translateX(-9%) scale(1.05)', offset: 1 }),
      ]))
    ]),
    transition('visible => hidden', [
      animate(3 * DURATION_ANIMATION, keyframes([
        style({ opacity: 0.5, transform: 'translateX(-9%) scale(1.05)', offset: 0 }),
        style({ opacity: 0, transform: 'translateX(-10%) scale(1.06)', offset: 0.1 }),
        style({ opacity: 0, transform: 'translateX(0) scale(1)', offset: 1 }),
      ]))
    ]),
  ]),
]
})


export class AuthBgSliderComponent implements OnInit, OnDestroy {
  states = Array(NUMBER_PICS).fill('hidden');
  state1 = 'hidden';
  activeImage = 0;
  sub: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.states[NUMBER_PICS-1] = 'visible';
    this.sub = interval(DURATION_ANIMATION)
    .subscribe(() => this.changeBg());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Background image transitions
  changeBg() {
    this.states[this.activeImage] = 'hidden';
    this.activeImage = (this.activeImage + 1) % this.states.length;
    this.states[this.activeImage] = 'visible';
    this.state1 = this.state1 === 'visible' ? 'hidden' : 'visible';
  }
}
