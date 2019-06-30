import { FilePreviewModel } from 'ngx-awesome-uploader';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { HttpService } from '../services/http.service';

export class DemoFilePickerAdapter extends FilePickerAdapter {

  event_slug: string;

  constructor(private http: HttpClient, private httpService: HttpService) {
    super();
  }

  public uploadFile(fileItem: FilePreviewModel) {
    const form = new FormData();
    form.append('file', fileItem.file);
    const api = this.httpService.apiUrl + '/api/file-upload/' + this.httpService.current_gallery;
    const httpOptions = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.httpService.token,
        enctype: 'multipart/form-data'
      });
    const req = new HttpRequest('POST', api, form, {headers: httpOptions, reportProgress: true});
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

    public removeFile(fileItem: FilePreviewModel): Observable<any> {
      console.log(fileItem.fileId);
      const removeApi = 'https://ponthe-testing.enpc.org/api';
      return this.http.post(removeApi, {id: fileItem.fileId});
    }
}
