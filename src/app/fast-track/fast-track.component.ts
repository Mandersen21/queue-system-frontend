import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fast-track',
  templateUrl: './fast-track.component.html',
  styleUrls: ['./fast-track.component.css']
})
export class FastTrackComponent implements OnInit {

  fastTrack: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
