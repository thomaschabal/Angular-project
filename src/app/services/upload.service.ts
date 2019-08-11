import { Injectable } from '@angular/core';
import { FilePreviewModel } from 'ngx-awesome-uploader';

import { HttpService } from './http.service';

@Injectable()
export class UploadService {

  uploadFiles: File[];

  constructor(private httpService: HttpService) { }

  // Upload of files
  uploadFile(fileItem: FilePreviewModel, gallerySlug: string) {
    return this.httpService.post('/api/file-upload/' + gallerySlug, fileItem);
  }
  // Remove files
}
