import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {

  articles = [];

  constructor(private httpClient : HttpClient,
              private authService : AuthService) { }

  ngOnInit() {
    const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json'
      })
    };
    this.httpClient.get(this.authService.apiUrl + '/api/cgu', httpOptions)
    .subscribe(
      (res) => {
        let len = Object.keys(res["articles"]).length;
        for (let i=1; i<len+1; i++) {
          this.articles.push(res["articles"][i]);
        }
      },
      (error) => { console.log(error); }
    )
  }

}
