import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.css']
})
export class TriageComponent implements OnInit {

  @Input() fastTrack: boolean;

  constructor() { }

  ngOnInit() {
  }

}
