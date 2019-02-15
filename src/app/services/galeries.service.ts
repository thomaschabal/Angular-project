import { HttpService } from '../services/http.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleriesService {
  galeries_events :any[];


  event_pics: any[];

  all_galeries: any[];
  pic : any;
  constructor(private httpService : HttpService,
              private httpClient : HttpClient) {
                const request_result = httpService.get("/api/get-all-galleries").then()
                this.galeries_events = request_result["galleries"]
                const requestResult = httpService.get("/api/get-all-galleries").then(
                  (res) => {
                    this.galeries_events = res["galleries"];
                  },
                  (error) => { }
                );

              }

  getEventByName(private httpService : HttpService, event : string) {
    this.httpService.post("/api/get-images/"+event, {"image-slug": event}).then(
      (res) => {
        this.event_pics = res["files"];
        console.log(res);
      },
      (error) => { }
    );

    return this.event_pics;
  }

  getAllEvents() {
    //this.all_galeries = this.httpService.get('/api/get-galleries-by-year')["data"];
    return this.galeries_events;
  }

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
