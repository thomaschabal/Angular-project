export enum GalleryTypes {
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO',
}

export interface LastEvent {
    name: string;
    fond: string;
    routing: string;
    event_id: string;
    next_event_id: string;
    resume: string;
    type: GalleryTypes;
}

export interface HomeGallery {
    name: string;
    slug: string;
    description: string;
    image: string;
    type: GalleryTypes;
}

export interface GetLatestGalleriesResponse {
    galleries: HomeGallery[];
}
