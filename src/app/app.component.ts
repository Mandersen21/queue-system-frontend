import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PusherService } from './pusher.service';
import { AdminServiceService } from './admin/admin-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
})
export class AppComponent implements OnInit {
  title = 'app';

  fastTrackOpen: boolean = false

  // Route intervals
  normalQueueInterval: number = 30000
  fastQueueInterval: number = 30001
  informationInterval: number = 5000
  information2Interval: number = 5001
  information3Interval: number = 5002

  // Main interval
  currentInterval: number = 0

  router: Router;
  sub: Subscription;

  constructor(router: Router, private pusherService: PusherService, private adminService: AdminServiceService) {
    this.router = router;

    this.getOptions()

    // Set dashboard as first page
    this.currentInterval = this.normalQueueInterval

    // Start timer
    this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
  }

  ngOnInit() {
    this.pusherService.channel.bind('new-option', data => {
      this.getOptions()
    });
  }

  getOptions() {
    this.adminService.getOptions().subscribe(
      data => { this.fastTrackOpen = data[0].fastTrackOpen },
      error => { console.log("Error", error) }
    )
  }

  changeIntervalBasedOnRoute() {
    if (this.router.url != '/admin') {
      if (this.currentInterval === this.normalQueueInterval) {

        if (this.fastTrackOpen) {
          this.currentInterval = this.fastQueueInterval
          this.router.navigateByUrl('/dashboard-fast');
        }
        else {
          // Set to information screen 1
        }
        return
      }

      if (this.currentInterval === this.fastQueueInterval) {
        this.currentInterval = this.normalQueueInterval
        this.router.navigateByUrl('/dashboard');
        return
      }

      // if (this.currentInterval === this.informationInterval) {
      //   this.currentInterval = this.information2Interval
      //   this.router.navigateByUrl('/information2');
      //   this.sub.unsubscribe();
      //   this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      //   return;
      // }

      // if (this.currentInterval === this.information2Interval) {
      //   this.currentInterval = this.information3Interval
      //   this.router.navigateByUrl('/information3');
      //   this.sub.unsubscribe();
      //   this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      //   return;
      // }

      // if (this.currentInterval === this.information3Interval) {
      //   this.currentInterval = this.normalQueueInterval
      //   this.router.navigateByUrl('/dashboard');
      //   this.sub.unsubscribe();
      //   this.sub = interval(this.currentInterval).subscribe((val) => { this.changeIntervalBasedOnRoute() })
      //   return;
      // }
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
