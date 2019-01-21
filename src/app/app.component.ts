import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Galeries Ponthé';

  fonction(){
    console.log("on a cliqué ici");
  }
}
