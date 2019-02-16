import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent implements OnInit {

  constructor(private httpService : HttpService,
              private router : ActivatedRoute) { }

  ngOnInit() { }

  isOnline() {
    // Display the footer everywhere except on auth, reset, register pages and gallery page
    return ((this.httpService.token !== null) && (this.router.snapshot._routerState.url).search('/galeries'));

  }

}
