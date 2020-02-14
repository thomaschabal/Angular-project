import { style, animate, keyframes } from '@angular/animations';

export const bounceIn = animate('750ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
    style({ offset: 0, opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' }),
    style({ offset: 0.2, transform: 'scale3d(1.1, 1.1, 1.1)' }),
    style({ offset: 0.4, transform: 'scale3d(0.9, 0.9, 0.9)' }),
    style({ offset: 0.6, opacity: 1, transform: 'scale3d(1.03, 1.03, 1.03)' }),
    style({ offset: 0.8, transform: 'scale3d(0.97, 0.97, 0.97)' }),
    style({ offset: 1, opacity: 1, transform: 'scale3d(1, 1, 1)' }),
]));

export const bounceOut = animate('300ms', keyframes([
    style({ offset: 0, opacity: 1, transform: 'scale3d(1, 1, 1)' }),
    style({ offset: 0.2, transform: 'scale3d(0.9, 0.9, 0.9)' }),
    style({ offset: 0.5, opacity: 1, transform: 'scale3d(1.1, 1.1, 1.1)' }),
    style({ offset: 0.55, opacity: 1, transform: 'scale3d(1.1, 1.1, 1.1)' }),
    style({ offset: 1, opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' }),
]));

export const fadeIn = (DURATION, OPACITY = 1) => animate(DURATION, keyframes([
    style({ offset: 0, opacity: 0 }),
    style({ offset: 1, opacity: OPACITY })
]));

export const fadeOut = (DURATION, OPACITY = 1) => animate(DURATION, keyframes([
    style({ offset: 0, opacity: OPACITY }),
    style({ offset: 1, opacity: 0 })
]));

export const unfoldIn = (DURATION = '1s') => animate(DURATION + ' cubic-bezier(0.165, 0.840, 0.440, 1.000)', keyframes([
    style({ offset: 0, transform: 'scaleY(0.005) scaleX(0)'}),
    style({ offset: 0.5, transform: 'scaleY(0.005) scaleX(1)'}),
    style({ offset: 1, transform: 'scaleY(1) scaleX(1)'}),
]));

export const unfoldOut = (DURATION = '1s') => animate(DURATION + ' cubic-bezier(0.165, 0.840, 0.440, 1.000)', keyframes([
    style({ offset: 0, transform: 'scaleY(1) scaleX(1)'}),
    style({ offset: 0.5, transform: 'scaleY(0.005) scaleX(1)'}),
    style({ offset: 1, transform: 'scaleY(0.005) scaleX(0)'}),
]));

export const pulse = (DURATION = 350) => animate(DURATION, keyframes([
    style({ offset: 0, transform: 'scale3d(1, 1, 1)' }),
    style({ offset: 0.5, transform: 'scale3d(1.05, 1.05, 1.05)' }),
    style({ offset: 1, transform: 'scale3d(1, 1, 1)' }),
]));