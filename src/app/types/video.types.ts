import { AllReactions, Reaction } from './reactions.types';

export interface Film {
  name: string;
  slug: string;
  image?: string;
}

export interface FilmData {
  name: string;
  description: string;
  private: boolean;
  has_cover_image: boolean;
  has_video: boolean;
  video_slug: string;
  own_reaction: Reaction;
  all_reactions: AllReactions;
}

export interface GetFilmographyResponse {
  number_of_videos: number;
  galleries: Film[];
}

export interface GetVideoCoverImageResponse {
  image: string;
}

export interface VideoSource {
  url: string;
  resolution: string;
}
