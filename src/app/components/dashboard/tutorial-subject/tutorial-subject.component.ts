import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial-subject',
  templateUrl: './tutorial-subject.component.html',
  styleUrls: ['./tutorial-subject.component.scss']
})
export class TutorialSubjectComponent implements OnInit {
  @Input() tuto: any;
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  onClickTuto() {
    this.isOpen = !this.isOpen;
  }

}
