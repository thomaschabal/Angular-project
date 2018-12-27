import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService : AuthService,
              private router : ActivatedRoute) { }

  ngOnInit() {
  }

  isOnline() {
    return (this.authService.isAuth && (this.router.snapshot._routerState.url).search('/galeries'));

  }

}
