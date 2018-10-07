import { Component } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
})
export class AppComponent {
  title = 'app';

  currentInterval = 10000
  router: Router;

  sub: Subscription;

  constructor(router: Router) {
    this.router = router;

    // Start timer
    this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
  }

  changeIntervalBasedOnRoute() {
    if (this.currentInterval === 10000) {
      this.currentInterval = 5000
      console.log("Change interval to 5 sec")
      this.router.navigateByUrl('/admin');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return
    }

    if (this.currentInterval === 5000) {
      this.currentInterval = 10000
      console.log("Change interval to 10 sec")
      this.router.navigateByUrl('/dashboard');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return;
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
