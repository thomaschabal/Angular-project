import { Component, OnInit, HostListener } from '@angular/core';

import { ReactionsService } from 'src/app/services/reactions.service';
import { BREAKPOINTS } from 'src/app/constants/Breakpoints';
import { pontheSpinnerAnimation } from 'src/app/constants/Animations';

@Component({
  selector: 'app-crush',
  templateUrl: './crush.component.html',
  styleUrls: ['./crush.component.scss'],
  animations: [pontheSpinnerAnimation]
})
export class CrushComponent implements OnInit {
  picClicked = false;
  indexViewer: number;

  constructor(public reactionsService: ReactionsService) {}

  ngOnInit(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.reactionsService.loadFirstCrushPics();
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    const articles = document.getElementsByClassName('thumb');
    const articleHeight = articles[0].clientHeight;
    const boundary = articles[articles.length - 1];
    const boundaryTop = boundary.getBoundingClientRect().top;

    const THRESHOLD = window.innerWidth < BREAKPOINTS.SMALL ? 14 : 4;
    // Load more pics when there are 4 lines of pics remaining before the end of the current page
    if (boundaryTop - THRESHOLD * articleHeight < window.innerHeight) {
      this.reactionsService.loadMoreCrushPics();
    }
  }

  onClickPic(iSelectedPic: number) {
    this.indexViewer = iSelectedPic;
    this.picClicked = true;
    // Have a blurred background when the image viewer is active
    document.getElementById('header').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('main').style.filter = 'blur(8px)';
  }

  closePic() {
    this.picClicked = false;
    // Remove the blurred background
    document.getElementById('header').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    document.getElementById('main').style.filter = 'none';
  }
}
