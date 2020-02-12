import { Injectable } from '@angular/core';

@Injectable()
export class PwaService {
    promptEvent: any;

    constructor() {
        window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault();
            this.promptEvent = event;
        });
        window.addEventListener('appinstalled', event => {
            console.log('a2hs', 'installed');
        });
    }

    installPwa() {
        this.promptEvent.prompt();
        this.promptEvent.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            }
            this.promptEvent = null;
        });
    }
}
