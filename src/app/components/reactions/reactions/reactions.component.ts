import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, OnChanges } from '@angular/core';

import { ReactionsService, Reaction } from 'src/app/services/reactions.service';
import { REACTIONS } from 'src/app/constants/Reactions';

const EMPTY_REACTIONS = Array(REACTIONS.length).fill(false);
const REACTION_TYPES = REACTIONS.map(reaction => reaction.name);
const NULL_REACTIONS = [null, undefined, 'NONE'];

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent implements OnInit, OnChanges {
  isBannerOpen = false;

  reactions = REACTIONS;
  reactionTypes = REACTION_TYPES;
  selected = EMPTY_REACTIONS.slice(0);
  @Input() slugPic: string;
  @Input() ownReaction: string;
  @Output() updateReaction = new EventEmitter<{}>();
  hasReaction = this.ownReaction !== undefined && this.ownReaction !== 'NONE';
  currentReaction = (this.hasReaction) ? REACTIONS.filter(reaction => reaction.name === this.ownReaction)[0] : REACTIONS[0];

  constructor(private reactionsService: ReactionsService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.setCurrentReaction();
  }

  ngOnChanges() {
    this.setCurrentReaction();
  }

  setCurrentReaction() {
    this.hasReaction = NULL_REACTIONS.indexOf(this.ownReaction) === -1;
    this.currentReaction = (this.hasReaction) ? REACTIONS.filter(reaction => reaction.name === this.ownReaction)[0] : REACTIONS[0];
  }

  @HostListener('document:click', ['$event'])
  clickOutsideBanner(event) {
    if (this.isBannerOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isBannerOpen = false;
    } else if (!this.isBannerOpen && this.elementRef.nativeElement.contains(event.target)) {
      this.isBannerOpen = true;
    }
  }

  onClickIcon(index: number) {
    const currentIndex = this.selected.indexOf(true);
    this.selected = EMPTY_REACTIONS.slice(0);
    if (index !== currentIndex) {
      this.selected[index] = true;
      const reactionType = REACTION_TYPES[index];
      this.reactionsService.updateReaction(Reaction[reactionType], this.slugPic)
        .then(
          (res: { reaction: string }) => {
            this.updateReaction.next(res.reaction);
            this.hasReaction = true;
            this.isBannerOpen = false;
          },
          (error) => {
            this.selected[index] = false;
          }
        );
    } else {
      this.reactionsService.updateReaction(Reaction.NONE, this.slugPic)
        .then(
          (res: { reaction: string }) => {
            this.updateReaction.next(res.reaction);
            this.hasReaction = false;
            this.isBannerOpen = false;
          },
          (error) => {
            this.selected[index] = true;
          }
        );
    }
  }
}
