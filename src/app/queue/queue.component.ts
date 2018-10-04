import { Component, OnInit, Input } from '@angular/core';
import { QueueService } from 'src/app/queue/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  // Patient Queues
  patientQueue: Array<IPatient>;
  patientQueueSorted: Array<IQueueRow> = [];
  standardPatients: Array<IQueueRow> = [];
  nonUrgentPatientQueue: Array<IQueueRow> = [];

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

  constructor(queueService: QueueService) {

    // Get patients from backend
    queueService.getPatients().subscribe(
      data => { this.patientQueue = data },
      err => console.error(err),
      () => this.sortPatients() // Sort patients after received data
    )
  }

  ngOnInit() {

  }

  // TODO: Do this a little nicer
  private sortPatients() {

    // Add time at start
    this.patientQueueSorted.push({ id: SectionTime.SMALL })

    this.patientQueue.forEach(p => {
      this.patientQueueSorted.push({ id: p.id, patientId: p.patientInitials, baby: p.age > 4 ? true : false, decreased: false, increased: false, triage: p.triage })
    })

    // Add next time
    this.patientQueueSorted.push({ id: SectionTime.MEDIUM })

    this.patientQueue.forEach(p => {
      this.patientQueueSorted.push({ id: p.id, patientId: p.patientInitials, baby: p.age > 4 ? true : false, decreased: false, increased: false, triage: p.triage })
    })

    // Add next time
    this.patientQueueSorted.push({ id: SectionTime.MEDIUM_HIGH })

    this.patientQueue.forEach(p => {
      this.patientQueueSorted.push({ id: p.id, patientId: p.patientInitials, baby: p.age > 4 ? true : false, decreased: false, increased: false, triage: p.triage })
    })

    // Add next time
    this.patientQueueSorted.push({ id: SectionTime.HIGH })

    this.patientQueue.forEach(p => {
      this.patientQueueSorted.push({ id: p.id, patientId: p.patientInitials, baby: p.age > 4 ? true : false, decreased: false, increased: false, triage: p.triage })
    })

    this.patientQueueSorted.forEach(patient => {
      if (patient.triage === 4) {
        this.standardPatients.push(patient)
      }
  
      if (patient.triage === Triage.NON_URGENT) {
        this.nonUrgentPatientQueue.push(patient)
      }
    })

    // Add patient numbers
    this.standardPatients.forEach(function (p, i) {
      console.log(p)
    })
  }

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
  fullname: string,
  age: number,
  patientInitials: string,
  triage: Triage,
  registredTime: Date,
  waitingTime: Date,
}

export interface IQueueRow {
  id: string,
  patientId?: string,
  decreased?: boolean,
  increased?: boolean,
  baby?: boolean,
  triage?: Triage
}