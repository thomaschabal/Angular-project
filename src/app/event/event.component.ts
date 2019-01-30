import { Component, OnInit, OnDestroy } from '@angular/core';
import { GaleriesService } from '../services/galeries.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
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
}
