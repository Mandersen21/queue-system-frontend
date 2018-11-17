import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  patientRegisterModel: IPatient
  patientUpdateModel: IPatient

  constructor() { }

  ngOnInit() {
    this.patientRegisterModel = { name: '', infant: 0, triage: 0, queueType: 0 }
  }

  private registerPatient() {
    console.log(this.patientRegisterModel)
  }

}

export interface IPatient {
  name: string,
  infant: boolean,
  triage: number,
  queueType: boolean
}
