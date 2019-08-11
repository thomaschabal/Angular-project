import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FilePickerComponent, ValidationError, FilePreviewModel } from 'ngx-awesome-uploader';

import { HttpService } from '../services/http.service';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  // FILE UPLOAD
  @ViewChild('uploader') uploader: FilePickerComponent;
  adapter = new DemoFilePickerAdapter(this.httpClient, this.httpService);
  myFiles: FilePreviewModel[] = [];
  selectedRoute: string;

  constructor(private httpService: HttpService,
              private httpClient: HttpClient,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const selectedRoute = this.activeRoute.snapshot.params.event;
    this.selectedRoute = selectedRoute;
    this.httpService.currentGallery = selectedRoute;
  }

  onValidationError(e: ValidationError) {
    console.log(e);
  }
  onUploadSuccess(e: FilePreviewModel) {
   console.log(e);
   console.log(this.myFiles);
  }
  onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }
  onFileAdded(file: FilePreviewModel) {
    this.myFiles.push(file);
  }

  // DOESN'T WORK FOR NOW
  removeFile() {
    this.uploader.removeFileFromList(this.myFiles[0].fileName);
  }

  // USELESS FOR THE MOMENT
  /* uploadFilesToServer() {
    console.log(this.myFiles);
    for (const file of this.myFiles) {
      const form = new FormData();
      form.append('file', file.file);
      this.httpService.postFiles('/api/file-upload/' + this.selectedRoute, form)
      .subscribe(
        (res) => { console.log(res); },
        (error) => { console.error(error); }
      );
    }
  } */
}
