import { Component, OnInit, Input } from '@angular/core';
import { QueueService } from 'src/app/queue/queue.service';
import { PusherService } from '../pusher.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() fastTrack: boolean;
  @Input() usePrioritisation: boolean;

  // Patient Queues
  patients: Array<IPatient>;
  patientQueueSorted: Array<IQueueRow> = [];
  patientFastTrackQueueSorted: Array<IQueueRow> = [];

  sectionTimes: Array<SectionTime> = []

  constructor(private queueService: QueueService, private pusherService: PusherService) {

    // SectionTimes in from small to very high
    this.sectionTimes.push(SectionTime.SMALL, SectionTime.MEDIUM, SectionTime.MEDIUM_HIGH, SectionTime.HIGH, SectionTime.VERY_HIGH)
    this.getPatientsData(true)

    // Get fresh data every 1 min
    setInterval(() => {
      this.getPatientsData(true)
    }, 60000);
  }

  ngOnInit() {
    this.pusherService.channel.bind('new-update', data => {
      this.getPatientsData(true)
    });

    this.pusherService.channel.bind('new-update-from-admin', data => {
      this.getPatientsData(false)
    });
  }

  private getPatientsData(update): void {
    // Get patients from backend via service
    this.queueService.getPatients(update).subscribe(
      data => { this.patients = data },
      err => console.error(err),
      () => this.sortPatients()
    )
  }

  private sortPatients() {
    if (this.patientQueueSorted.length > 0) { this.patientQueueSorted = [] }
    if (this.patientFastTrackQueueSorted.length > 0) { this.patientFastTrackQueueSorted = [] }

    if (!this.usePrioritisation) {
      this.sortOnWaitingTime()
    }
    else {
      this.sortOnPriority()
    }
  }

  private sortOnWaitingTime() {
   
    this.patients.forEach(p => {
      if (p.triage > 0) {
        if (p.fastTrack) {
          this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
        } else
          this.addPatientToQueue(this.patientQueueSorted, p);
      }
    })

    // Regular
    let index0 = this.patientQueueSorted.findIndex(p => p.minutesToWait < 30)
    if (index0 != -1) { this.patientQueueSorted.splice(index0 , 0, { _id: this.sectionTimes[0] }) }
    
    let index30 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 29 && p.minutesToWait < 61 )
    if (index30 != -1) { this.patientQueueSorted.splice(index30, 0, { _id: this.sectionTimes[1] }) }
    
    let index60 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 60 && p.minutesToWait < 121)
    if (index60 != -1) { this.patientQueueSorted.splice(index60, 0, { _id: this.sectionTimes[2] }) }
    
    let index120 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 120 && p.minutesToWait < 181)
    if (index120 != -1) { this.patientQueueSorted.splice(index120, 0, { _id: this.sectionTimes[3] }) }

    let index180 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 180)
    if (index180 != -1) { this.patientQueueSorted.splice(index180, 0, { _id: this.sectionTimes[4] }) }

    // fasttrack
    let indexfast0 = this.patientFastTrackQueueSorted.findIndex(p => p.minutesToWait < 29)
    if (indexfast0 != -1) { this.patientFastTrackQueueSorted.splice(indexfast0 , 0, { _id: this.sectionTimes[0] }) }
    
    let indexfast30 = this.patientFastTrackQueueSorted.findIndex(p => p.minutesToWait > 29 && p.minutesToWait < 61 )
    if (indexfast30 != -1) { this.patientFastTrackQueueSorted.splice(indexfast30, 0, { _id: this.sectionTimes[1] }) }
    
    let indexfast60 = this.patientFastTrackQueueSorted.findIndex(p => p.minutesToWait > 60 && p.minutesToWait < 121)
    if (indexfast60 != -1) { this.patientFastTrackQueueSorted.splice(indexfast60, 0, { _id: this.sectionTimes[2] }) }
    
    let indexfast120 = this.patientFastTrackQueueSorted.findIndex(p => p.minutesToWait > 120 && p.minutesToWait < 181)
    if (indexfast120 != -1) { this.patientFastTrackQueueSorted.splice(indexfast120, 0, { _id: this.sectionTimes[3] }) }

    let indexfast180 = this.patientFastTrackQueueSorted.findIndex(p => p.minutesToWait > 180)
    if (indexfast180 != -1) { this.patientFastTrackQueueSorted.splice(indexfast180, 0, { _id: this.sectionTimes[4] }) }
  }

  private sortOnPriority() {

    this.patients.forEach(p => {
      if (p.triage > 0) {
        if (p.fastTrack) {
          this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
        } else
          this.addPatientToQueue(this.patientQueueSorted, p);
      }
    })

  }
  
  private addPositions() {
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

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  private addPatientToQueue(patientArray: IQueueRow[], patient: IPatient) {
    patientArray.push({
      _id: patient._id,
      position: (Number(patient.queuePosition) + 1).toString(),
      patientId: patient.patientId,
      baby: patient.age < 4 ? true : false,
      decreased: (patient.minutesToWait > 30 && patient.oldMinutesToWait < 30 || 
        patient.minutesToWait > 60 && patient.oldMinutesToWait < 60 || 
        patient.minutesToWait > 120 && patient.oldMinutesToWait < 120 ||
        patient.minutesToWait > 180 && patient.oldMinutesToWait < 180
        ) ? true : false,
      increased: (patient.minutesToWait < 30 && patient.oldMinutesToWait > 29 ||
        patient.minutesToWait < 60 && patient.oldMinutesToWait > 59 ||
        patient.minutesToWait < 120 && patient.oldMinutesToWait > 119 ||
        patient.minutesToWait < 180 && patient.oldMinutesToWait > 179
        ) ? true : false,
      triage: patient.triage,
      fastTrack: patient.fastTrack,
      registredTime: patient.registredTime,
      minutesToWait: patient.minutesToWait,
      oldMinutesToWait: patient.oldMinutesToWait
    })
  }
}

export enum SectionTime {
  SMALL = "Under 30 minutter",
  MEDIUM = "30 - 60 minutter",
  MEDIUM_HIGH = "1 - 2 timer",
  HIGH = "2 - 3 timer",
  VERY_HIGH = "Over 3 timer"
}

export enum Triage {
  IMMEDIATE = 1,
  VERY_URGENT = 2,
  URGENT = 3,
  STANDARD = 4,
  NON_URGENT = 5
}

export interface IPatient {
  _id: string,
  name: string,
  age: number,
  patientId: string,
  position?: string,
  patientInitials: string,
  triage: Triage,
  fastTrack: boolean,
  registredTime: Date,
  actualTime: Date,
  minutesToWait: number,
  oldMinutesToWait: number,
  queuePriority: boolean,
  queuePosition: number
}

export interface IQueueRow {
  _id: string,
  position?: string,
  patientId?: string,
  decreased?: boolean,
  increased?: boolean,
  baby?: boolean,
  triage?: Triage,
  fastTrack?: boolean,
  registredTime?: Date,
  minutesToWait?: number,
  oldMinutesToWait?: number,
}