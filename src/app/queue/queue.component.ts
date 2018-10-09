import { Component, OnInit, Input } from '@angular/core';
import { QueueService } from 'src/app/queue/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() fastTrack: boolean;

  // Patient Queues
  patients: Array<IPatient>;
  patientQueueSorted: Array<IQueueRow> = [];
  patientFastTrackQueueSorted: Array<IQueueRow> = [];

  sectionTimes: Array<SectionTime> = []

  constructor(queueService: QueueService) {

    // SectionTimes in from small to high
    this.sectionTimes.push(SectionTime.SMALL, SectionTime.MEDIUM, SectionTime.MEDIUM_HIGH, SectionTime.HIGH, SectionTime.VERY_HIGH)

    // Get patients from backend via service
    queueService.getPatients().subscribe(
      data => { this.patients = data },
      err => console.error(err),
      () => this.sortPatients()
    )
  }

  ngOnInit() {

  }

  private sortPatients() {
    this.sectionTimes.forEach(time => {
      this.pushPatientsToArray(time)
    });
  }

  // TODO: Add if statements based on waiting times
  private pushPatientsToArray(sectionTime: SectionTime) {

    if (sectionTime === SectionTime.SMALL) {

      // Add section time to patient sorted array
      this.patientQueueSorted.push({ id: sectionTime })
      this.patientFastTrackQueueSorted.push({ id: sectionTime })

      // Add patients that has under 30 min left
      this.patients.forEach(p => {
        if (!p.fastTrack) {
          this.addPatientToQueue(this.patientQueueSorted, p);
        }
        if (p.fastTrack) {
          this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
        }
      })
    }

    if (sectionTime === SectionTime.MEDIUM) {
      // Add patients that has 30 - 60 min left

      // Add section time to patient sorted array
      // this.patientQueueSorted.push({ id: sectionTime })
    }

    if (sectionTime === SectionTime.MEDIUM_HIGH) {
      // Add patients that has 60 - 120 min left

      // Add section time to patient sorted array
      // this.patientQueueSorted.push({ id: sectionTime })
    }

    if (sectionTime === SectionTime.HIGH) {
      // Add patients that has 120 - 180 min left

      // Add section time to patient sorted array
      // this.patientQueueSorted.push({ id: sectionTime })
    }

    if (sectionTime === SectionTime.VERY_HIGH) {
      // Add patients that has Over 180 min left

      // Add section time to patient sorted array
      // this.patientQueueSorted.push({ id: sectionTime })
    }

    // Sort positions for both lists
    let index = 0;
    this.patientQueueSorted.forEach(function (p) {
      if (p.patientId) {
        index = index + 1;
        p.position = (index).toString();
      }
    })

    index = 0;
    this.patientFastTrackQueueSorted.forEach(function (p) {
      if (p.patientId) {
        index = index + 1;
        p.position = (index).toString();
      }
    })

  }

  private addPatientToQueue(patientArray: IQueueRow[], patient: IPatient) {
    patientArray.push({
      id: patient.id,
      position: patient.position,
      patientId: patient.patientInitials,
      baby: patient.age < 4 ? true : false,
      decreased: false,
      increased: false,
      triage: patient.triage,
      fastTrack: patient.fastTrack
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
  position?: string,
  patientInitials: string,
  triage: Triage,
  fastTrack: boolean,
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
  triage?: Triage,
  fastTrack?: boolean,
}