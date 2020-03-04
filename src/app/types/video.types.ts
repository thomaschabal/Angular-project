export interface Film {
  name: string;
  slug: string;
  image?: string;
}

export interface FilmData {
  name: string;
  description: string;
  private: boolean;
}

export interface GetFilmographyResponse {
  number_of_videos: number;
  galleries: Film[];
}

export interface GetVideoCoverImageResponse {
  image: string;
}
