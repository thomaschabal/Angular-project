import { Component, OnInit } from '@angular/core';

import { VideoService } from 'src/app/services/video.service';
import { ReactionsService } from 'src/app/services/reactions.service';
import { REACTIONS } from 'src/app/constants/Reactions';
import { Reaction } from 'src/app/types/reactions.types';

const EMPTY_REACTIONS = Array(REACTIONS.length).fill(false);
const REACTION_TYPES = REACTIONS.map(reaction => reaction.name);

@Component({
  selector: 'app-reactions-videos',
  templateUrl: './reactions-videos.component.html',
  styleUrls: ['./reactions-videos.component.scss']
})
export class ReactionsVideosComponent implements OnInit {
  reactions = REACTIONS;
  selected = EMPTY_REACTIONS.slice(0);

  constructor(private reactionsService: ReactionsService,
              public videoService: VideoService) { }

  ngOnInit(): void {
  }

  allReactionsNotEmpty() {
    return Object.keys(this.videoService.movieDetails.all_reactions).length > 0;
  }

  onClickIcon(index: number) {
    const currentIndex = this.selected.indexOf(true);
    this.selected = EMPTY_REACTIONS.slice(0);
    if (index !== currentIndex) {
      this.selected[index] = true;
      const reactionType = REACTION_TYPES[index];
      this.reactionsService.updateReaction(Reaction[reactionType], this.videoService.movieDetails.video_slug)
        .then(
          (res: { reaction: string }) => {
            this.videoService.movieDetails.own_reaction = Reaction[reactionType];
          },
          (error) => {
            this.selected[index] = false;
          }
        );
    } else {
      this.reactionsService.updateReaction(Reaction.NONE, this.videoService.movieDetails.video_slug)
        .then(
          (res: { reaction: string }) => {
          },
          (error) => {
            this.selected[index] = true;
          }
        );
    }
  }

}
