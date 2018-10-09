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

  // Route intervals
  dashboardInterval: number = 10000
  informationInterval: number = 5000
  information2Interval: number = 5001
  information3Interval: number = 5002
  
  // Main interval
  currentInterval: number = 0

  router: Router;
  sub: Subscription;

  constructor(router: Router) {
    this.router = router;

    // Set dashboard as first page
    this.currentInterval = this.dashboardInterval

    // Start timer
    this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
  }

  changeIntervalBasedOnRoute() {
    if (this.currentInterval === this.dashboardInterval) {
      this.currentInterval = this.informationInterval
      this.router.navigateByUrl('/information');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return
    }

    if (this.currentInterval === this.informationInterval) {
      this.currentInterval = this.information2Interval
      this.router.navigateByUrl('/information2');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return;
    }

    if (this.currentInterval === this.information2Interval) {
      this.currentInterval = this.information3Interval
      this.router.navigateByUrl('/information3');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return;
    }

    if (this.currentInterval === this.information3Interval) {
      this.currentInterval = this.dashboardInterval
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
