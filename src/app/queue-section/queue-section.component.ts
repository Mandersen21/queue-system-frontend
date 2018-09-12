import { Component, OnInit, Input } from '@angular/core';
import { SectionTime } from 'src/app/queue/queue.component';

@Component({
  selector: 'app-queue-section',
  templateUrl: './queue-section.component.html',
  styleUrls: ['./queue-section.component.css']
})
export class QueueSectionComponent implements OnInit {

  @Input() sectionTime: SectionTime;

  constructor() { }

  ngOnInit() {
    
  }

}