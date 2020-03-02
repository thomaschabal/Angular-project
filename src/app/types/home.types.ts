export interface LastEvent {
    name: string;
    fond: string;
    routing: string;
    event_id: string;
    next_event_id: string;
    resume: string;
}

export interface HomeGallery {
    name: string;
    slug: string;
    description: string;
    image: string;
}

export interface GetLatestGalleriesResponse {
    galleries: HomeGallery[];
}
