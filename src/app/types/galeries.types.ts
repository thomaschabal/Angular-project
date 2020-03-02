export interface PhotoGallery {
    name: string;
    slug: string;
    image: string;
}

export interface VideoGallery {
    name: string;
    slug: string;
    image?: string;
}

export interface GetAllGalleriesResponse {
    number_of_galleries: number;
    galleries: PhotoGallery[];
}

export interface GetPrivatePhotoGalleriesResponse {
    galleries: PhotoGallery[];
}

export interface GetPrivateVideoGalleriesResponse {
    galleries: VideoGallery[];
}

export interface CreateGalleryRequest {
    name: string;
    description: string;
    year_slug: string;
    event_slug: string;
    boolPrivate: string;
    type: string;
    private: string;
}
