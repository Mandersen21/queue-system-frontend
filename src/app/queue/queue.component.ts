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

  // private sortOnRegistredTimeAndTriage() {
  //   let sortedArray = this.patients.sort((a: IPatient, b: IPatient) => {
  //     return this.getTime(a.registredTime) - this.getTime(b.registredTime);
  //   });

  //   sortedArray.forEach(p => {
  //     this.addPatientToQueue(this.patientQueueSorted, p);
  //   })
  // }

  private sortOnWaitingTime() {

  }
  private sortOnPriority() {

    // Add patient with priority queue into the list
    // let patient: IPatient
    // patient = { _id: '321312', age: 23, name: 'Mikkel Andersen', patientInitials: 'MA', triage: Triage.NON_URGENT, patientId: 'MA0003', fastTrack: false, registredTime: new Date(), waitingTime: new Date(), minutesToWait: 23, queuePriority: true, queuePosition: 1 }
    // this.patients.push(patient)

    // let patient1: IPatient
    // patient = { _id: '3213344212', age: 23, name: 'Mikkel Andersen', patientInitials: 'MA', triage: Triage.STANDARD, patientId: 'MA0004', fastTrack: false, registredTime: new Date(), waitingTime: new Date(), minutesToWait: 23, queuePriority: true, queuePosition: 2 }
    // this.patients.push(patient1)

    console.log(this.patients)

    let redPatients = this.patients.filter(p => p.triage == Triage.IMMEDIATE);
    let orangePatients = this.patients.filter(p => p.triage == Triage.VERY_URGENT);
    let yelloPatients = this.patients.filter(p => p.triage == Triage.URGENT);
    let greenPatients = this.patients.filter(p => p.triage == Triage.STANDARD);
    let bluePatients = this.patients.filter(p => p.triage == Triage.NON_URGENT);
    let priorityPatients = this.patients.filter(p => p.queuePriority == true);

    console.log(priorityPatients)

    redPatients.forEach(p => {
      if (p.fastTrack) {
        this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
      } else
        this.addPatientToQueue(this.patientQueueSorted, p);
    })

    orangePatients.forEach(p => {
      if (p.fastTrack) {
        this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
      } else
        this.addPatientToQueue(this.patientQueueSorted, p);
    })

    yelloPatients.forEach(p => {
      if (p.fastTrack) {
        this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
      } else
        this.addPatientToQueue(this.patientQueueSorted, p);
    })

    greenPatients.forEach(p => {
      if (p.fastTrack) {
        this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
      } else
        this.addPatientToQueue(this.patientQueueSorted, p);
    })

    bluePatients.forEach(p => {
      if (p.fastTrack) {
        this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
      } else
        this.addPatientToQueue(this.patientQueueSorted, p);
    })

    // Add priority patients into the sorted queue.
    priorityPatients.forEach(p => {
      if (p.fastTrack) {
        this.patientFastTrackQueueSorted.splice(p.queuePosition, 0, { _id: p._id, patientId: p.patientId, baby: p.age < 4 ? true : false, decreased: false, increased: true, triage: p.triage, fastTrack: p.fastTrack, registredTime: p.registredTime })
      }
      else {
        this.patientQueueSorted.splice(p.queuePosition, 0, { _id: p._id, patientId: p.patientId, baby: p.age < 4 ? true : false, decreased: false, increased: true, triage: p.triage, fastTrack: p.fastTrack, registredTime: p.registredTime })
      }
    })

    // Add queue position index
    this.addPositions();
  }
  // private sortOnWaitingTime(sectionTime: SectionTime) {

  //   if (sectionTime === SectionTime.SMALL && this.patients.filter(p => p.minutesToWait < 30).length > 0) {

  //     let fastTrackPatients: boolean = this.patients.filter(p => p.fastTrack == true && p.minutesToWait < 30).length > 0
  //     let standardPatients: boolean = this.patients.filter(p => p.fastTrack == false && p.minutesToWait < 30).length > 0

  //     if (standardPatients) { this.patientQueueSorted.push({ _id: sectionTime }) }
  //     if (fastTrackPatients) { this.patientFastTrackQueueSorted.push({ _id: sectionTime }) }

  //     this.patients.forEach(p => {
  //       if (!p.fastTrack && p.minutesToWait < 30) {
  //         this.addPatientToQueue(this.patientQueueSorted, p);
  //       }
  //       if (p.fastTrack && p.minutesToWait < 30) {
  //         this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
  //       }
  //     })
  //   }

  //   if (sectionTime === SectionTime.MEDIUM && this.patients.filter(p => p.minutesToWait >= 30 && p.minutesToWait <= 60).length > 0) {

  //     let fastTrackPatients: boolean = this.patients.filter(p => p.fastTrack == true && p.minutesToWait >= 30 && p.minutesToWait <= 60).length > 0
  //     let standardPatients: boolean = this.patients.filter(p => p.fastTrack == false && p.minutesToWait >= 30 && p.minutesToWait <= 60).length > 0

  //     // Add section time to patient sorted array
  //     if (standardPatients) { this.patientQueueSorted.push({ _id: sectionTime }) }
  //     if (fastTrackPatients) { this.patientFastTrackQueueSorted.push({ _id: sectionTime }) }

  //     // Add patients that has 30 - 60 min left
  //     this.patients.forEach(p => {
  //       if (!p.fastTrack && (p.minutesToWait > 29 && p.minutesToWait < 60)) {
  //         this.addPatientToQueue(this.patientQueueSorted, p);
  //       }
  //       if (p.fastTrack && (p.minutesToWait > 29 && p.minutesToWait < 60)) {
  //         this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
  //       }
  //     })
  //   }

  //   if (sectionTime === SectionTime.MEDIUM_HIGH && this.patients.filter(p => p.minutesToWait > 60 && p.minutesToWait <= 120).length > 0) {

  //     let fastTrackPatients: boolean = this.patients.filter(p => p.fastTrack == true && p.minutesToWait > 60 && p.minutesToWait <= 120).length > 0
  //     let standardPatients: boolean = this.patients.filter(p => p.fastTrack == false && p.minutesToWait > 60 && p.minutesToWait <= 120).length > 0

  //     // Add section time to patient sorted array
  //     if (standardPatients) { this.patientQueueSorted.push({ _id: sectionTime }) }
  //     if (fastTrackPatients) { this.patientFastTrackQueueSorted.push({ _id: sectionTime }) }

  //     // Add patients that has 60 - 120 min left
  //     this.patients.forEach(p => {
  //       if (!p.fastTrack && (p.minutesToWait > 59 && p.minutesToWait < 121)) {
  //         this.addPatientToQueue(this.patientQueueSorted, p);
  //       }
  //       if (p.fastTrack && (p.minutesToWait > 59 && p.minutesToWait < 121)) {
  //         this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
  //       }
  //     })
  //   }

  //   if (sectionTime === SectionTime.HIGH && this.patients.filter(p => p.minutesToWait > 120 && p.minutesToWait <= 180).length > 0) {

  //     let fastTrackPatients: boolean = this.patients.filter(p => p.fastTrack == true && p.minutesToWait > 120 && p.minutesToWait <= 180).length > 0
  //     let standardPatients: boolean = this.patients.filter(p => p.fastTrack == false && p.minutesToWait > 120 && p.minutesToWait <= 180).length > 0

  //     // Add section time to patient sorted array
  //     if (standardPatients) { this.patientQueueSorted.push({ _id: sectionTime }) }
  //     if (fastTrackPatients) { this.patientFastTrackQueueSorted.push({ _id: sectionTime }) }

  //     // Add patients that has 120 - 180 min left
  //     this.patients.forEach(p => {
  //       if (!p.fastTrack && (p.minutesToWait > 120 && p.minutesToWait < 181)) {
  //         this.addPatientToQueue(this.patientQueueSorted, p);
  //       }
  //       if (p.fastTrack && (p.minutesToWait > 120 && p.minutesToWait < 181)) {
  //         this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
  //       }
  //     })
  //   }

  //   if (sectionTime === SectionTime.VERY_HIGH && this.patients.filter(p => p.minutesToWait > 180).length > 0) {

  //     let fastTrackPatients: boolean = this.patients.filter(p => p.fastTrack == true && p.minutesToWait > 180).length > 0
  //     let standardPatients: boolean = this.patients.filter(p => p.fastTrack == false && p.minutesToWait > 180).length > 0

  //     // Add section time to patient sorted array
  //     if (standardPatients) { this.patientQueueSorted.push({ _id: sectionTime }) }
  //     if (fastTrackPatients) { this.patientFastTrackQueueSorted.push({ _id: sectionTime }) }

  //     // Add patients that has Over 180 min left
  //     this.patients.forEach(p => {
  //       if (!p.fastTrack && (p.minutesToWait > 180)) {
  //         this.addPatientToQueue(this.patientQueueSorted, p);
  //       }
  //       if (p.fastTrack && (p.minutesToWait > 180)) {
  //         this.addPatientToQueue(this.patientFastTrackQueueSorted, p);
  //       }
  //     })
  //   }

  //   this.addPositions()
  // }

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
      position: patient.position,
      patientId: patient.patientId,
      baby: patient.age < 4 ? true : false,
      decreased: false,
      increased: false,
      triage: patient.triage,
      fastTrack: patient.fastTrack,
      registredTime: patient.registredTime,
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
  waitingTime: Date,
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
}