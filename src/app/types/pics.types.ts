import { AllReactions } from './reactions.types';

export interface GetFullImageResponse {
    base64: string;
}

interface GalleryData {
    cover_image_id?: number;
    description: string;
    slug: string;
    name: string;
}

interface ImageDimension {
    width: number;
    height: number;
}

export interface Pic {
    file_path: string;
    full_dimension?: ImageDimension;
    base64?: string;
    own_reaction?: string;
    all_reactions: AllReactions;
}

export interface GetImagesResponse {
    number_of_files: number;
    gallery: GalleryData;
    files: Pic[];
}
