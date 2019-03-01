import { FilePreviewModel } from 'ngx-awesome-uploader';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FilePickerAdapter } from 'ngx-awesome-uploader';

export class DemoFilePickerAdapter extends FilePickerAdapter {

  event_slug : string;

  constructor(private http: HttpClient, event_slug: string) {
    super();
    this.event_slug = event_slug;
    console.log(event_slug);
  }

  public uploadFile(fileItem: FilePreviewModel) {
    const form = new FormData();
    form.append('file', fileItem.file);
    form.append('gallery_slug', 'wei-2019');
    const api = 'https://ponthe-testing.enpc.org/api/file-upload/wei-2019';
    const req = new HttpRequest('POST', api, form, {reportProgress: true});
    return this.http.request(req)
    .pipe(
      map( (res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          return res.body.id;
        } else {
          return res;
        }
      })
      );
  }

    public removeFile(id: string, fileItem: FilePreviewModel): Observable<any> {
      console.log(fileItem.fileId);
    const removeApi = 'https://ponthe-testing.enpc.org/api';
    return this.http.post(removeApi, {id: fileItem.fileId});
    }
}
