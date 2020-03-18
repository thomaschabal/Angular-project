import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reaction-icon',
  templateUrl: './reaction-icon.component.html',
  styleUrls: ['./reaction-icon.component.scss']
})
export class ReactionIconComponent implements OnInit {
  @Input() type: string;
  @Input() iconFull: string;
  @Input() iconEmpty: string;
  @Input() isSelected: boolean;
  @Output() clickIcon = new EventEmitter<{}>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.clickIcon.next();
  }

}
