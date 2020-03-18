import { Component, OnInit, Input } from '@angular/core';

import { VideoSource } from 'src/app/types/video.types';
import { RESOLUTIONS } from 'src/app/services/video.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { PATH_GEAR } from 'src/app/constants/Images';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.scss']
})
export class VideoViewerComponent implements OnInit {
  @Input() srcs: VideoSource[];
  @Input() poster: string;
  selectedSourceResolution = RESOLUTIONS[0];
  selectedSourceUrl: string;
  pathGear = PATH_GEAR;
  optionsVisible = false;

  constructor(private breakpointsService: BreakpointsService) { }

  ngOnInit() {
    this.setSelectedSourceUrl();
  }

  setSelectedSourceUrl() {
    this.selectedSourceUrl = this.srcs.filter(src => src.resolution === this.selectedSourceResolution)[0].url;
  }

  selectResolution(resolution: string) {
    this.selectedSourceResolution = resolution;
    this.setSelectedSourceUrl();
  }

  setOptionsVisible() {
    if (this.breakpointsService.isMobileOrTablet) {
      this.optionsVisible = !this.optionsVisible;
    }
  }

  hoverOptions(value: boolean) {
    if (this.breakpointsService.isDesktop) {
      this.optionsVisible = value;
    }
  }

}
