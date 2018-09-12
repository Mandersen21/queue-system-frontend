import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() queueType: QueueType;

  constructor() { 
    
  }

  ngOnInit() {
  }

  public isFasttrack(queueType: QueueType) {
    return queueType === QueueType.fast ? true : false;
  }

}

export enum QueueType {
  normal = 1,
  fast = 2,
}