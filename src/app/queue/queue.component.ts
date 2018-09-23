import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() queueType: QueueType;

  // Patient Queue
  patientQueue: Array<IPatient>;

  // Queues
  queue: Array<IQueue>;

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

  get veryHighTime(): string {
    return SectionTime.VERY_HIGH;
  }

  constructor() {
    this.patientQueue = this.getPatients();
    this.queue = this.getQueue();
  }

  ngOnInit() {

  }

  public isFasttrack(queueType: QueueType) {
    return queueType === QueueType.FAST ? true : false;
  }

  private getPatients(): IPatient[] {
    return [
      { id: 'HJ54DF', priority: Triage.IMMEDIATE, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.NON_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.STANDARD, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.VERY_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.STANDARD, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.NON_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.NON_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.STANDARD, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.NON_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.STANDARD, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.NON_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.STANDARD, waitingTime: new Date(), registredTime: new Date(), name: '' },
      { id: 'HJ54DF', priority: Triage.NON_URGENT, waitingTime: new Date(), registredTime: new Date(), name: '' },
    ]
  }

  private getQueue(): IQueue[] {
    return [
      {
        rows: [
          { id: 'Under 30 min', priority: null },
          { id: 'HJ54DF', priority: Triage.STANDARD },
          { id: 'JK54DS', priority: Triage.STANDARD },
          { id: 'Fra 30 til 60 min', priority: null },
          { id: 'HJ54DF', priority: Triage.STANDARD },
        ]
      },
      {
        rows: [
          { id: 'Fra 30 til 60 min', priority: null },
          { id: 'HJ54DF', priority: Triage.STANDARD },
          { id: 'JK54DS', priority: Triage.STANDARD }
        ]
      },
      {
        rows: [
          { id: 'Fra 60 til 120 min', priority: null },
          { id: 'HJ54DF', priority: Triage.STANDARD },
          { id: 'JK54DS', priority: Triage.STANDARD }
        ]
      }
    ]
  }
}

export enum QueueType {
  NORMAL = 1,
  FAST = 2,
}

export enum SectionTime {
  SMALL = "Under 30 minutter",
  MEDIUM = "Ca. 30 - 60 minutter",
  MEDIUM_HIGH = "Ca. 60 - 120 minutter",
  HIGH = "Ca. 120 - 180 minutter",
  VERY_HIGH = "Fra 180 minutter"
}

export enum Triage {
  IMMEDIATE = 1,
  VERY_URGENT = 2,
  URGENT = 3,
  STANDARD = 4,
  NON_URGENT = 5
}

export interface IPatient {
  id: string,
  priority: Triage,
  waitingTime: Date,
  registredTime: Date,
  name: string,
}

export interface IQueue {
  rows: Array<IQueueRow>,
}

export interface IQueueRow {
  id: string,
  priority?: Triage
}


