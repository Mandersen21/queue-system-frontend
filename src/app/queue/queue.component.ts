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
    this.getPatientsData()

    // Get fresh data every 1 min
    setInterval(() => {
      this.getPatientsData()
    }, 60000);
  }

  ngOnInit() {
    this.pusherService.channel.bind('new-update', data => {
      this.getPatientsData()
    });
  }

  private getPatientsData(): void {
    // Get patients from backend via service
    this.queueService.getPatients().subscribe(
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

    let index0 = this.patientQueueSorted.findIndex(p => p.minutesToWait < 30)
    if (index0 != -1) { this.patientQueueSorted.splice(index0 , 0, { _id: this.sectionTimes[0] }) }
    
    let index30 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 30)
    if (index30 != -1) { this.patientQueueSorted.splice(index30, 0, { _id: this.sectionTimes[1] }) }
    
    let index60 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 60)
    if (index60 != -1) { this.patientQueueSorted.splice(index60, 0, { _id: this.sectionTimes[2] }) }
    
    let index120 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 120)
    if (index120 != -1) { this.patientQueueSorted.splice(index120, 0, { _id: this.sectionTimes[3] }) }

    let index180 = this.patientQueueSorted.findIndex(p => p.minutesToWait > 180)
    if (index180 != -1) { this.patientQueueSorted.splice(index180, 0, { _id: this.sectionTimes[4] }) }
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
      decreased: false,
      increased: false,
      triage: patient.triage,
      fastTrack: patient.fastTrack,
      registredTime: patient.registredTime,
      minutesToWait: patient.minutesToWait
    })
  }
}

// function array_move(arr, old_index, new_index) {
//   if (new_index >= arr.length) {
//       var k = new_index - arr.length + 1;
//       while (k--) {
//           arr.push(undefined);
//       }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//   return arr; // for testing
// };

// // returns [2, 1, 3]
// console.log(array_move([1, 2, 3], 0, 1)); 

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
  minutesToWait?: number
}