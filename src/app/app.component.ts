import { Component } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ],
})
export class AppComponent {
  title = 'app';

  constructor() {

  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
