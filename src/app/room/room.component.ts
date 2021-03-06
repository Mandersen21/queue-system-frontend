import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() patientsInTreatment: number
  
  constructor() { }

  ngOnInit() {
    this.patientsInTreatment = 0
  }

}
