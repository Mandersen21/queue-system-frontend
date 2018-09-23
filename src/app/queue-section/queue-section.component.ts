import { Component, OnInit, Input } from '@angular/core';
import { SectionTime, QueueType } from 'src/app/queue/queue.component';

@Component({
  selector: 'app-queue-section',
  templateUrl: './queue-section.component.html',
  styleUrls: ['./queue-section.component.css']
})
export class QueueSectionComponent implements OnInit {

  @Input() queueType: QueueType;
  @Input() sectionTime: SectionTime;

  public patients = [
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
    // { id: "Patient", priority: 4 },
  ];

  constructor() { }

  ngOnInit() {
    
  }

  public isFasttrack(queueType: QueueType) {
    return queueType === QueueType.FAST ? true : false;
  }

}