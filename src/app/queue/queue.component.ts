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

  sectionTimes: Array<SectionTime> = []

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

    // SectionTimes in from small to high
    this.sectionTimes.push(SectionTime.SMALL, SectionTime.MEDIUM) //SectionTime.MEDIUM_HIGH, SectionTime.HIGH, SectionTime.VERY_HIGH)

    // Get patients from backend via service
    queueService.getPatients().subscribe(
      data => { this.patientQueue = data },
      err => console.error(err),
      () => this.sortPatients()
    )
  }

  ngOnInit() {

  }

  private sortPatients() {

    // Sort patients positions
    this.patientQueue.forEach(function(p, index) {
      p.position = (index + 1).toString();
    })

    this.sectionTimes.forEach(time => {
      this.pushPatientsToArray(time)
    });
  }

  // TODO: Add if statements based on waiting times
  private pushPatientsToArray(sectionTime: SectionTime) {

    // Add section time to patient sorted array
    this.patientQueueSorted.push({ id: sectionTime })

    if (sectionTime === SectionTime.SMALL) {
      // Add patients that has under 30 min left
      this.patientQueue.forEach(p => {
        this.patientQueueSorted.push({
          id: p.id,
          position: p.position,
          patientId: p.patientInitials,
          baby: p.age < 4 ? true : false,
          decreased: false,
          increased: false,
          triage: p.triage
        })
      })
    }

    if (sectionTime === SectionTime.MEDIUM) {
      // Add patients that has 30 - 60 min left

      // Add section time to patient sorted array
      this.patientQueueSorted.push({ id: sectionTime })
    }

    if (sectionTime === SectionTime.MEDIUM_HIGH) {
      // Add patients that has 60 - 120 min left

      // Add section time to patient sorted array
      this.patientQueueSorted.push({ id: sectionTime })
    }

    if (sectionTime === SectionTime.HIGH) {
      // Add patients that has 120 - 180 min left

      // Add section time to patient sorted array
      this.patientQueueSorted.push({ id: sectionTime })
    }

    if (sectionTime === SectionTime.VERY_HIGH) {
      // Add patients that has Over 180 min left

      // Add section time to patient sorted array
      this.patientQueueSorted.push({ id: sectionTime })
    }

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
  position?: string,
  patientInitials: string,
  triage: Triage,
  registredTime: Date,
  waitingTime: Date,
}

export interface IQueueRow {
  id: string,
  position?: string,
  patientId?: string,
  decreased?: boolean,
  increased?: boolean,
  baby?: boolean,
  triage?: Triage
}