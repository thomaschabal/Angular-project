import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  constructor(private httpService: HttpService,
              private router: ActivatedRoute) { }

  get isOnline() {
    return (this.httpService.token !== null) && ('galeries' in this.router.snapshot.url);
  }
}
