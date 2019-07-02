import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { FilePreviewModel } from 'ngx-awesome-uploader';

@Injectable()
export class UploadService {

  uploadFiles: File[];

  constructor(private httpService: HttpService) { }

  // Upload of files
  uploadFile(fileItem: FilePreviewModel, gallerySlug: string) {
    return this.httpService.post('/file-upload/' + gallerySlug, fileItem);
  }

  // Remove files


}
