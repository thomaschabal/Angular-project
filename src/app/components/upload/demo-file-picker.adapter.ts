import { FilePreviewModel, FilePickerAdapter } from 'ngx-awesome-uploader';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { environment } from 'src/environments/environment';
import { VideoService } from 'src/app/services/video.service';
import API from '../../services/Api';

export class DemoFilePickerAdapter extends FilePickerAdapter {
  filesUploading = {};
  filesUploadingSource = new BehaviorSubject({});
  filesUploadingStream = this.filesUploadingSource.asObservable();

  numberOfFilesToUpload = 0;
  filesToUploadSource = new BehaviorSubject(0);
  filesToUploadStream = this.filesToUploadSource.asObservable();

  numberOfFilesUploaded = 0;
  filesUploadedSource = new BehaviorSubject(0);
  filesUploadedStream = this.filesUploadedSource.asObservable();

  constructor(private http: HttpClient, private httpService: HttpService, private videoService: VideoService) {
    super();
  }

  getApiUrlForUpload() {
    const currentUrl = window.location.href;
    const fragments = currentUrl.split('/');
    const galleryType = fragments[fragments.length - 2];
    const apiBase = environment.apiUrl + API.fileUpload;
    if (galleryType === 'pics') {
      return apiBase + this.httpService.currentGallery;
    }
    return apiBase + this.videoService.selectedMovie;
  }

  updateFilesUploading() {
    this.filesUploadingSource.next(this.filesUploading);
  }
  updateFilesToUpload(nb: number) {
    this.numberOfFilesToUpload = nb;
    this.updateFilesUploading();
    this.filesToUploadSource.next(nb);
  }
  updateFilesUploaded(nb: number) {
    this.numberOfFilesUploaded = nb;
    this.updateFilesUploading();
    this.filesUploadedSource.next(nb);
  }

  public uploadFile(fileItem: FilePreviewModel) {
    console.log('enters upload function');
    console.log('file', fileItem);
    this.filesUploading[fileItem.fileName] = true;
    this.updateFilesToUpload(this.numberOfFilesToUpload + 1);
    const form = new FormData();
    form.append('file', fileItem.file);
    console.log('form file', form.get('file'));

    const api = this.getApiUrlForUpload();
    console.log('api route', api);
    const httpOptions = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.httpService.token,
        enctype: 'multipart/form-data',
        timeout: `${30 * 60 * 1000}`,
      });
    console.log('http options', httpOptions);
    const req = new HttpRequest('POST', api, form, {headers: httpOptions, reportProgress: true});
    console.log('req', req);
    return this.http.request(req)
    .pipe(
      map( (res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          delete this.filesUploading[fileItem.fileName];
          this.updateFilesUploaded(this.numberOfFilesUploaded + 1);
          return res.body.id;
        } else {
          return res;
        }
      })
    );
  }

  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    return this.http.post(environment.apiUrl, {id: fileItem.fileId});
  }
}
