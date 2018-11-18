import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminServiceService } from './admin-service.service';
import { IPatient } from '../queue/queue.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  patientRegisterModel: IUpdatePatient
  patientUpdateModel: IUpdatePatient
  patientData: any
  patients: Array<IPatient>

  acutePatients: number = 0

  constructor(private adminService: AdminServiceService) {
    this.patientUpdateModel = { name: 'Mads Wehlast', infant: "true", triage: "1", queueType: "true" }
    this.getPatients()
    // this.getPatientOption()
  }

  ngOnInit() {
    this.patientRegisterModel = { name: '', infant: "false", triage: "4", queueType: "false" }
    this.patientUpdateModel = { name: '', infant: "true", triage: "1", queueType: "true" }
  }

  private registerPatient() {
    console.log("Register patient", this.patientRegisterModel)
    if (this.patientRegisterModel.name.length > 0) {
      let name = this.patientRegisterModel.name
      let infant = this.patientRegisterModel.infant == "false" ? false : true
      let triage = Number(this.patientRegisterModel.triage)
      let queueType = this.patientRegisterModel.queueType == "false" ? false : true
      this.adminService.addPatient(name, infant, triage, queueType).subscribe(
        data => { console.log("POST Request is successful ", data); },
        error => { console.log("Error", error); },
        () => this.getPatients()
      );
    }
  }

  private updatePatient() {
    console.log("Update patient", this.patientUpdateModel)
    if (this.patientUpdateModel.patientId.length > 0 && this.patientUpdateModel.name.length > 0) {
      let patientId = this.patientUpdateModel.patientId
      let name = this.patientUpdateModel.name
      let infant = this.patientUpdateModel.infant == "false" ? false : true
      let triage = Number(this.patientUpdateModel.triage)
      let queueType = this.patientUpdateModel.queueType == "false" ? false : true
      this.adminService.updatePatient(patientId, name, infant, triage, queueType).subscribe(
        data => { console.log("Update Request is successful ", data); },
        error => { console.log("Error", error); },
        () => this.getPatients()
      );
    }
  }
  
  private updateValues(patientId, name, age, triage, fastTrack) {
    console.log(patientId, name, age, triage, fastTrack)
    let _name = name
    let infant = age > 3 ? "false" : "true"
    let _triage = triage.toString()
    let queueType = fastTrack === true ? "true" : "false"
    this.patientUpdateModel = { patientId: patientId, name: _name, infant: infant, triage: _triage, queueType: queueType }
  }

  private getPatients() {
    this.adminService.getPatients().subscribe(
      data => { console.log("Patient found "), this.patients = data, console.log(this.patients) },
      error => { console.log("Error", error) }
    )
  }

<<<<<<< HEAD
  private updateOptions() {
    console.log("Update options")
    this.adminService.updateOptions(this.acutePatients).subscribe(
      data => { console.log("Options updated"), console.log(data) },
      error => { console.log("Error", error) }
    )
  }

  private getPatientOption() {
    this.adminService.getOptions().subscribe(
      data => { console.log("Options found"), console.log(data) },
      error => { console.log("Error", error) }
    )
=======
  private deletePatient() {
    console.log("Delete patient", this.patientUpdateModel)
    if (this.patientUpdateModel.patientId.length > 0 && this.patientUpdateModel.name.length > 0) {
      let patientId = this.patientUpdateModel.patientId
      this.adminService.deletePatient(patientId).subscribe(
        data => { console.log("Delete Request is successful ", data); },
        error => { console.log("Error", error); },
        () => this.getPatients()
      );
    }
>>>>>>> 3bbe0f64dd7bf11f12958309d1d13cc9465bcc6c
  }

}

export interface IUpdatePatient {
  patientId?: string,
  name: string,
  infant: string,
  triage: string,
  queueType: string
}

export interface IPatientOption {
  acutePatients: number
}
