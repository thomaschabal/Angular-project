import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  last_events : any[];
  love_pics : any[];
  adresse_1 : string;
  adresse_2 : string;
  adresse_3 : string;
  private sub : Subscription;

  constructor(private homeService : HomeService,
              private activeRoute : ActivatedRoute) {
                this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' }));
              };

  ngOnInit() {
    this.last_events = this.homeService.last_events;
    this.love_pics = this.homeService.love_pics;
    this.adresse_1 = this.last_events[0].fond;
    this.adresse_2 = this.last_events[1].fond;
    this.adresse_3 = this.last_events[2].fond;
  }

  onSubmit(form : NgForm) {
    const name = form.value['name'];
    const email = form.value['email'];
    const message = form.value['message'];
    console.log (name + ", dont le mail est " + email + ", vous dit : " + message);
  }

  placement_events(i : number) {
    if (i%2 === 0) {
      return "right";
    } else {
      return "left";
    }
  }

  placement_love_pics(i : number) {
    if (i%2 === 0) {
      return "from-left";
    } else {
      return "from-right";
    }
  }

  public ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
    }

}
