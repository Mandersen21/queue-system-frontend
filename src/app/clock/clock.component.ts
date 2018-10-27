import { Component, OnInit } from '@angular/core';

import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  public clock: any;
  public date: any;

  constructor() {
    setInterval(() => {
      this.clock = moment().lang("da").format('HH:mm');
      this.date = moment().lang("da").format('LL')
  }, 1000) // Updates the time every second.
  }
  ngOnInit() {
    this.clock = moment().lang("da").format('HH:mm')
    this.date = moment().lang("da").format('LL')
  }

}
