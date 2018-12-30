import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usePrioritisation: boolean = false

  @Input() fastTrack: boolean;

  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route
      .data
      .subscribe(v => this.fastTrack = v.fastTrack);
  }

}
