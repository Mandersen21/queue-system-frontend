import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminServiceService } from './admin-service.service';
import { IPatient } from '../queue/queue.component';
import { PusherService } from '../pusher.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bdColor: string = 'rgba(186,186,186,0.38)'
  size: string = 'medium'
  color: string = '#fff'
  type: string = 'ball-beat'

  patientRegisterModel: IUpdatePatient
  patientUpdateModel: IUpdatePatient
  patientData: any
  patients: Array<IPatient>

  acutePatients: string = "0"
  patientInTreatment: number = 0
  acuteMessage: string = ''
  fastTrackOpen: string = "false"
  allWaitingTime: string = "0";

  oldUpdateWaitingTime: string = ''

  constructor(private adminService: AdminServiceService, private pusherService: PusherService, private spinner: NgxSpinnerService) {
    this.patientUpdateModel = { name: 'Mads Wehlast', infant: "true", triage: "1", queueType: "true", waitingTime: "0" }
    this.getPatients()

    // Get fresh data every 1 min
    setInterval(() => {
      this.getPatients()
    }, 60000);
  }

  ngOnInit() {
    this.patientRegisterModel = { name: '', infant: "false", triage: "4", queueType: "false", waitingTime: "0" }
    this.patientUpdateModel = { patientId: '', name: '', infant: "true", triage: "1", queueType: "true", waitingTime: "0" }

    this.getPatientOption()

    this.pusherService.channel.bind('new-option', data => {
      this.getPatientOption()
    });
    
  }

  public registerPatient() {
    if (this.patientRegisterModel.name.length > 0) {
      this.spinner.show();
      let name = this.patientRegisterModel.name
      let infant = this.patientRegisterModel.infant == "false" ? false : true
      let triage = Number(this.patientRegisterModel.triage)
      let queueType = this.patientRegisterModel.queueType == "false" ? false : true
      let waitingTime = this.patientRegisterModel.waitingTime
      this.adminService.addPatient(name, infant, triage, queueType, waitingTime).subscribe(
        data => { },
        error => { console.log("Error", error, this.spinner.hide()); },
        () => this.getPatients()
      );
    }
  }

  public updatePatient() {
    if (this.patientUpdateModel.patientId.length > 0 && this.patientUpdateModel.name.length > 0) {
      this.spinner.show();
      let patientId = this.patientUpdateModel.patientId
      let name = this.patientUpdateModel.name
      let infant = this.patientUpdateModel.infant == "false" ? false : true
      let triage = Number(this.patientUpdateModel.triage)
      let queueType = this.patientUpdateModel.queueType == "false" ? false : true
      let waitingTime = this.patientUpdateModel.waitingTime == this.oldUpdateWaitingTime ? "0" : this.patientUpdateModel.waitingTime
      this.adminService.updatePatient(patientId, name, infant, triage, queueType, waitingTime).subscribe(
        data => { },
        error => { console.log("Error", error); },
        () => this.spinner.hide()
      );
    }
  }

  public updateValues(patientId, name, age, triage, fastTrack, waitingTime) {
    let _name = name
    let infant = age > 3 ? "false" : "true"
    let _triage = triage.toString()
    let _queueType = fastTrack === true ? "true" : "false"
    let _waitingTime = waitingTime === undefined ? "0" : waitingTime
    this.oldUpdateWaitingTime = _waitingTime
    this.patientUpdateModel = { patientId: patientId, name: _name, infant: infant, triage: _triage, queueType: _queueType, waitingTime: _waitingTime }
  }

  public getPatients() {
    this.adminService.getPatients().subscribe(
      data => { this.patients = data, this.spinner.hide(), console.log(this.patients) },
      error => { console.log("Error", error) }
    )
  }

  public getPatientOption() {
    this.adminService.getOptions().subscribe(
      data => { this.acutePatients = data[0].acutePatients.toString(), this.acuteMessage = data[0].acutePatientMessage, this.fastTrackOpen = data[0].fastTrackOpen == true ? "true" : "false", this.patientInTreatment = data[0].patientInTreatment, this.spinner.hide() },
      error => { console.log("Error", error) }
    )
  }

  public updateOptions() {
    this.spinner.show();
    this.adminService.updateOptions(this.acutePatients, this.acuteMessage, this.fastTrackOpen, this.patientInTreatment, this.allWaitingTime, false).subscribe(
      data => { this.spinner.hide(); },
      error => { console.log("Error", error) }
    )
  }

  public deletePatient() {
    if (this.patientUpdateModel.patientId.length > 0 && this.patientUpdateModel.name.length > 0) {
      this.spinner.show();
      let patientId = this.patientUpdateModel.patientId
      this.adminService.deletePatient(patientId).subscribe(
        data => { },
        error => { console.log("Error", error); },
        () => this.getPatients()
      );
    }
  }

  public deleteAllPatients() {
    this.spinner.show();
    this.adminService.deleteAllPatients().subscribe(
      data => { },
      error => { console.log("Error", error); },
      () => this.getPatients()
    );
  }

  public clearMessage() {
    this.acuteMessage = ''
    this.updateOptions()
  }

  public updateTreatmentCount() {
    this.updateOptions()
  }

  public increaseRegister() {
    this.patientRegisterModel.waitingTime = (Number(this.patientRegisterModel.waitingTime) + 1).toString()
  }

  public increaseUpdater() {
    this.patientUpdateModel.waitingTime = (Number(this.patientUpdateModel.waitingTime) + 1).toString()
  }

  public decreaseRegister() {
    if ((Number(this.patientRegisterModel.waitingTime)) > 0) {
      this.patientRegisterModel.waitingTime = (Number(this.patientRegisterModel.waitingTime) - 1).toString()
    }
  }

  public decreaseUpdater() {
    if ((Number(this.patientUpdateModel.waitingTime)) > 0) {
      this.patientUpdateModel.waitingTime = (Number(this.patientUpdateModel.waitingTime) - 1).toString()
    }
  }

  public increaseAllTime() {
    this.spinner.show();
    this.adminService.updateOptions(this.acutePatients, this.acuteMessage, this.fastTrackOpen, this.patientInTreatment, this.allWaitingTime, true).subscribe(
      data => { this.spinner.hide(); },
      error => { console.log("Error", error) }
    )
  }

  public decreaseAllTime() {
    this.adminService.updateOptions(this.acutePatients, this.acuteMessage, this.fastTrackOpen, this.patientInTreatment, this.allWaitingTime, false).subscribe(
      data => { this.spinner.hide(); },
      error => { console.log("Error", error) }
    )
  }

}

export interface IUpdatePatient {
  patientId?: string,
  name: string,
  infant: string,
  triage: string,
  queueType: string
  waitingTime: string
}

export interface IPatientOption {
  acutePatients: number,
  acutePatientMessage: string,
  fastTrackOpen: boolean,
  patientInTreatment: number
}
