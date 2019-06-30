import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { FilePreviewModel } from 'ngx-awesome-uploader';

@Injectable()
export class UploadService {

  uploadFiles : File[];

  constructor(private httpService : HttpService) { }

  // Upload of files
  uploadFile(fileItem: FilePreviewModel, gallery_slug: string) {
    return this.httpService.post("/api/file-upload/"+gallery_slug, fileItem);
  }

  // Remove files


}
