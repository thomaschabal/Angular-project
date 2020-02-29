import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.scss']
})
export class VideoViewerComponent implements OnInit {
  @Input() src: string;
  @Input() poster: string;

  constructor() { }

  ngOnInit() {
  }

}
