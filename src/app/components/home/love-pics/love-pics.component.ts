import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { HomeService } from '../../../services/home.service';
import { PicsService } from '../../../services/pics.service';
import { BreakpointsService } from '../../../services/breakpoints.service';
import { routesAppFromRoot } from '../../../Routes';

@Component({
  selector: 'app-love-pics',
  templateUrl: './love-pics.component.html',
  styleUrls: ['./love-pics.component.scss']
})
export class LovePicsComponent implements OnInit, OnDestroy {
  picClicked = false;
  captionWidePic: string;

  private sub: Subscription;

  // State of various sections of the page (e.g. if the section is being hovered or not)
  lovePicsStateLeft = 'hidden-left';
  lovePicsStateRight = 'hidden-right';

  indexPicture: number;

  constructor(
    public homeService: HomeService,
    public picsService: PicsService,
    private breakpointsService: BreakpointsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    // Smooth transitions on arrow clicks
    this.sub = activeRoute.fragment
      .pipe(filter(f => !!f))
      .subscribe(f =>
        document.getElementById(f).scrollIntoView({ behavior: 'smooth' })
      );
  }

  ngOnInit(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    if (this.homeService.lovePics) {
      this.picsService.rawPics = this.homeService.lovePics.map(pic => pic.image);
      this.picsService.numberOfPics = this.homeService.lovePics.length;
    }

    if (!this.breakpointsService.isDesktop) {
      this.lovePicsStateLeft = 'visible';
      this.lovePicsStateRight = 'visible';
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  //// DISPLAY OF THE COMPONENTS, ANIMATIONS ON HOVER
  blurPage(blur: string) {
    document.getElementById('intro').style.filter = blur;
    for (const event of this.homeService.lastEvents) {
      document.getElementById(event.event_id).style.filter = blur;
    }
    document.getElementById('header-content').style.filter = blur;
    document.getElementById('gallery-pics').style.filter = blur;
    document.getElementById('contact').style.filter = blur;
    document.getElementById('footer').style.filter = blur;
  }

  onClickFavPic(i: number) {
    this.picClicked = true;
    this.captionWidePic = this.homeService.lovePics[i].name;
    this.indexPicture = i;

    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    this.blurPage('blur(8px)');
  }

  closeWidePic() {
    this.picClicked = false;
    this.indexPicture = null;

    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    this.blurPage('none');
  }

  onChangeIndexPicture(index: number) {
    this.indexPicture = index;
    this.captionWidePic = this.homeService.lovePics[this.indexPicture].name;
  }

  closePic() {
    this.closeWidePic();
  }

  // Information on the positioning of elements
  placement_events(i: number) {
    return i % 2 === 0 ? 'right' : 'left';
  }

  placementLovePics(i: number) {
    return i % 2 === 0 ? 'from-left' : 'from-right';
  }

  // Update animations when hovering elements
  survoleCoeur(stateLovePics: string) {
    if (stateLovePics === 'visible') {
      this.lovePicsStateLeft = stateLovePics;
      this.lovePicsStateRight = stateLovePics;
    } else {
      this.lovePicsStateLeft = 'hidden-left';
      this.lovePicsStateRight = 'hidden-right';
    }
  }

  clickOnNextArrow(fragment: string) {
    document.getElementById(fragment).scrollIntoView({ behavior: 'smooth' });
  }

  redirectToCrushPics() {
    this.router.navigate([routesAppFromRoot.crush]);
  }
}
