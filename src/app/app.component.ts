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
  dashboardInterval: number = 40000
  informationInterval: number = 10000
  information2Interval: number = 10001
  information3Interval: number = 10002
  
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
      console.log("Change interval to information")
      this.router.navigateByUrl('/information');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return
    }

    if (this.currentInterval === this.informationInterval) {
      this.currentInterval = this.information2Interval
      console.log("Change interval to information 2")
      this.router.navigateByUrl('/information2');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return;
    }

    if (this.currentInterval === this.information2Interval) {
      this.currentInterval = this.information3Interval
      console.log("Change interval to information 3")
      this.router.navigateByUrl('/information3');
      this.sub.unsubscribe();
      this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      return;
    }

    if (this.currentInterval === this.information3Interval) {
      this.currentInterval = this.dashboardInterval
      console.log("Change interval to dashboard")
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
