import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-acute',
  templateUrl: './acute.component.html',
  styleUrls: ['./acute.component.css']
})
export class AcuteComponent implements OnInit {

  @Input() acutePatients: number

  constructor() { 
    
  }

  ngOnInit() {
    this.acutePatients = 0;
  }

}
