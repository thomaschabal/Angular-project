import { Component, OnInit } from '@angular/core';

import { ReactionsService } from '@src/app/services/reactions.service';
import { pontheSpinnerAnimation } from '@src/app/constants/Animations';

import { registerElement } from 'nativescript-angular/element-registry';
import { ShadowedLabel } from 'nativescript-shadowed-label';
registerElement('ShadowedLabel', () => ShadowedLabel);

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
    this.reactionsService.loadFirstCrushPics();
  }

  get reloadFunction() {
    return () => this.reactionsService.loadMoreCrushPics();
  }

  // onClickPic(iSelectedPic: number) {
  //   this.indexViewer = iSelectedPic;
  //   this.picClicked = true;
  //   // Have a blurred background when the image viewer is active
  //   document.getElementById('header').style.display = 'none';
  //   document.getElementById('footer').style.display = 'none';
  //   document.getElementById('main').style.filter = 'blur(8px)';
  // }

  // closePic() {
  //   this.picClicked = false;
  //   // Remove the blurred background
  //   document.getElementById('header').style.display = 'block';
  //   document.getElementById('footer').style.display = 'block';
  //   document.getElementById('main').style.filter = 'none';
  // }
}
