import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() queueType: QueueType;

  get smallTime(): string {
    return SectionTime.SMALL;
  }

  get mediumTime(): string {
    return SectionTime.MEDIUM;
  }

  get mediumHighTime(): string {
    return SectionTime.MEDIUM_HIGH;
  }

  get highTime(): string {
    return SectionTime.HIGH;
  }

  constructor() {

  }

  ngOnInit() {

  }

  public isFasttrack(queueType: QueueType) {
    return queueType === QueueType.FAST ? true : false;
  }

}

export enum QueueType {
  NORMAL = 1,
  FAST = 2,
}

export enum SectionTime {
  SMALL = "Under 30 min",
  MEDIUM = "Fra 30 til 60 min",
  MEDIUM_HIGH = "Fra 60 til 120 min",
  HIGH = "Fra 120 min"
}