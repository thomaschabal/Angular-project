import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleriesService {
  galeries_events :any[];


  event_pics: any[];

  all_galeries: any[];

  constructor(private httpService: HttpService,
              private httpClient: HttpClient) {
                const request_result = httpService.get("/api/get-all-galleries").then()
                this.galeries_events = request_result["galleries"]
                console.log(this.galeries_events);
                const requestResult = httpService.get("/api/get-all-galleries").then(
                  (res) => {
                    this.galeries_events = res["galleries"];
                  },
                  (error) => { }
                );

              }

  getEventByName(event: string) {
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
}
