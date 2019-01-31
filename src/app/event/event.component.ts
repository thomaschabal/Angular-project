import { Component, OnInit, OnDestroy } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { state, trigger, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  animations : [
    trigger('picsTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('200ms') ] ),
    ]),
    trigger('footerTrigger', [
      state('visible', style({opacity: 1, transform : 'translateY(2vh)'})),
      state('hidden', style({opacity : 0})),
      transition('* => *', [ animate('200ms') ] ),
    ]),
  ]
})
export class EventComponent implements OnInit, OnDestroy {

  adresse : string;
  name : string;
  pics : any[];
  resume : string;
  private sub : Subscription;
  isAdmin = false;
  isPublic = true;
  enModeration = false;

  picsState = ["hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden", "hidden"];
  footerState = "hidden";

  constructor(private galeriesService : GaleriesService,
              private route : ActivatedRoute,
              private activeRoute : ActivatedRoute) {
              this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' }));
             }

  ngOnInit() {
    const selected_route = this.route.snapshot.params['event'];
    this.name = this.galeriesService.getEventByName(selected_route).name;
    this.pics = this.galeriesService.getEventByName(selected_route).pics;
    this.resume = this.galeriesService.getEventByName(selected_route).resume;
    this.adresse = this.activeRoute.snapshot._routerState.url;
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

  modere() {
    this.enModeration = !this.enModeration;
  }

  survolePics(state : string) {
    for (let pic = 0; pic < this.picsState.length; pic++) {
      this.picsState[pic] = state;
    }
    console.log("survol" + state);
    console.log(this.picsState);
  }

  state(i) {
    return this.picsState[i];
  }

  changeStateFooter() {
    if (this.footerState === "hidden") {
      this.footerState = "visible";
    } else {
      this.footerState = "hidden";
    }
  }
}
