import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminServiceService } from './admin-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  patientRegisterModel: IPatient
  patientUpdateModel: IPatient
  patientDataFound: any

  constructor(private adminService: AdminServiceService) {
    this.patientUpdateModel = { name: 'Mads Wehlast', infant: "true", triage: "1", queueType: "true" }
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
        error => { console.log("Error", error); }
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
        error => { console.log("Error", error); }
      );
    }
  }
  
  private getPatient() {
    console.log("Getting patient info")
    console.log(this.patientUpdateModel.patientId)
    if (this.patientUpdateModel.patientId.length > 0) {
      let patientId = this.patientUpdateModel.patientId
      this.adminService.getPatient(patientId).subscribe(
        data => { console.log("Patient found "), this.patientDataFound = data },
        error => { console.log("Error", error) },
        () => this.updateValues()
      )
    }
  }

  private updateValues() {
    console.log(this.patientDataFound)
  }

}

export interface IPatient {
  patientId?: string,
  name: string,
  infant: string,
  triage: string,
  queueType: string
}
