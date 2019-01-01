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

  spinnerConfig: object = {
    bdColor: 'rgba(186,186,186,0.38)',
    size: 'medium',
    color: '#fff',
    type: 'ball-beat'
  }

  patientRegisterModel: IUpdatePatient
  patientUpdateModel: IUpdatePatient
  patientData: any
  patients: Array<IPatient>

  acutePatients: string = "0"
  patientInTreatment: number = 0
  acuteMessage: string = ''
  fastTrackOpen: string = "false"

  constructor(private adminService: AdminServiceService, private pusherService: PusherService, private spinner: NgxSpinnerService) {
    this.patientUpdateModel = { name: 'Mads Wehlast', infant: "true", triage: "1", queueType: "true", queuePriority: "false", queuePosition: "0" }
    this.getPatients()
  }

  ngOnInit() {
    this.patientRegisterModel = { name: '', infant: "false", triage: "4", queueType: "false", queuePriority: "false", queuePosition: "0" }
    this.patientUpdateModel = { patientId: '', name: '', infant: "true", triage: "1", queueType: "true", queuePriority: "false", queuePosition: "0" }

    this.getPatientOption()

    this.pusherService.channel.bind('new-option', data => {
      this.getPatientOption()
    });

    //this.spinner.show();
    //this.spinner.hide();
  }

  public registerPatient() {
    if (this.patientRegisterModel.name.length > 0) {
      this.spinner.show();
      let name = this.patientRegisterModel.name
      let infant = this.patientRegisterModel.infant == "false" ? false : true
      let triage = Number(this.patientRegisterModel.triage)
      let queueType = this.patientRegisterModel.queueType == "false" ? false : true
      let queuePriority = this.patientRegisterModel.queuePriority == "false" ? false : true
      let queuePosition = this.patientRegisterModel.queuePosition
      this.adminService.addPatient(name, infant, triage, queueType, queuePriority, queuePosition).subscribe(
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
      let queuePriority = this.patientUpdateModel.queuePriority == "false" ? false : true
      let queuePosition = this.patientUpdateModel.queuePosition
      this.adminService.updatePatient(patientId, name, infant, triage, queueType, queuePriority, queuePosition).subscribe(
        data => { },
        error => { console.log("Error", error); },
        () => this.getPatients()
      );
    }
  }

  public updateValues(patientId, name, age, triage, fastTrack, queuePriority, queuePosition) {
    let _name = name
    let infant = age > 3 ? "false" : "true"
    let _triage = triage.toString()
    let queueType = fastTrack === true ? "true" : "false"
    let _queuePriority = queuePriority === true ? "true" : "false"
    let _queuePosition = queuePosition === undefined ? "0" : queuePosition
    this.patientUpdateModel = { patientId: patientId, name: _name, infant: infant, triage: _triage, queueType: queueType, queuePriority: _queuePriority, queuePosition: _queuePosition }
  }

  public getPatients() {
    this.adminService.getPatients().subscribe(
      data => { this.patients = data, this.spinner.hide() },
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
    this.adminService.updateOptions(this.acutePatients, this.acuteMessage, this.fastTrackOpen, this.patientInTreatment).subscribe(
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
    this.patientRegisterModel.queuePriority = "true"
    this.patientRegisterModel.queuePosition = (Number(this.patientRegisterModel.queuePosition) + 1).toString()
  }

  public increaseUpdater() {
    this.patientUpdateModel.queuePriority = "true"
    this.patientUpdateModel.queuePosition = (Number(this.patientUpdateModel.queuePosition) + 1).toString()
  }

  public decreaseRegister() {
    this.patientRegisterModel.queuePriority = "true"
    if ((Number(this.patientRegisterModel.queuePosition)) > 0) {
      this.patientRegisterModel.queuePosition = (Number(this.patientRegisterModel.queuePosition) - 1).toString()
    }
  }

  public decreaseUpdater() {
    this.patientUpdateModel.queuePriority = "true"
    if ((Number(this.patientUpdateModel.queuePosition)) > 0) {
      this.patientUpdateModel.queuePosition = (Number(this.patientUpdateModel.queuePosition) - 1).toString()
    }
  }

}

export interface IUpdatePatient {
  patientId?: string,
  name: string,
  infant: string,
  triage: string,
  queueType: string
  queuePriority: string,
  queuePosition: string
}

export interface IPatientOption {
  acutePatients: number,
  acutePatientMessage: string,
  fastTrackOpen: boolean,
  patientInTreatment: number
}
