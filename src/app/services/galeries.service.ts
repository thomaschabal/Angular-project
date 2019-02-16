import { HttpService } from '../services/http.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleriesService {
  galeries_events :any[];

  event_pics: any[];

  pic : any;

  constructor(private httpService : HttpService,
              private httpClient : HttpClient) {
      // Request to get the list of all public events
      const requestResult = httpService.get("/api/get-all-galleries").then(
        (res) => {
          this.galeries_events = res["galleries"];
        },
        (error) => { }
      );
    }

  // Get the image associated to some event
  getEventByName(event : string) {
    this.httpService.post("/api/get-images/"+event, {"image-slug": event}).then(
      (res) => {
        this.event_pics = res["files"];
        console.log(res);
      },
      (error) => { }
    );

    return this.event_pics;
  }

  // Get the list of all events
  getAllEvents() {
    return this.galeries_events;
  }

  // Get the full picture (not the thumbnail) associated to some path
  getFullImage(path : string){
    this.httpService.post("/api/get-full-image", {'file_path' : path}).then(
      (res) => {
        this.pic = res['base64'];
        console.log(res);
      },
      (error) => { }
    );
    return this.pic;
  }
}
