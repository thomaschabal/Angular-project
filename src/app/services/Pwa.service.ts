import { Injectable } from '@angular/core';

const DISPLAY_MESSAGE = 3000;

@Injectable()
export class PwaService {
    promptEvent: any;
    downloading = false;
    installed = false;

    constructor() {
        window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault();
            this.promptEvent = event;
        });
        window.addEventListener('appinstalled', event => {
            console.log('a2hs', 'installed');
            this.installed = true;
            setTimeout(() => this.installed = false, DISPLAY_MESSAGE);
        });
    }

    installPwa() {
        console.log(this.promptEvent)
        this.promptEvent.prompt();
        this.promptEvent.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                this.downloading = true;
                setTimeout(() => this.downloading = false, DISPLAY_MESSAGE);
            }
            this.promptEvent = null;
        });
    }
}
