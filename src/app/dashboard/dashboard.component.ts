import { Component, OnInit } from '@angular/core';
import { QueueType } from '../queue/queue.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public normalQueue: QueueType = QueueType.normal;
  public fastQueue: QueueType = QueueType.fast;

  constructor() { 
    
  }

  ngOnInit() {
  }

}
