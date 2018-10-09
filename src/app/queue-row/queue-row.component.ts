import { Component, OnInit, Input } from '@angular/core';
import { Triage } from 'src/app/queue/queue.component';

@Component({
  selector: 'app-queue-row',
  templateUrl: './queue-row.component.html',
  styleUrls: ['./queue-row.component.css']
})
export class QueueRowComponent implements OnInit {

  @Input() id: string
  @Input() position: string
  @Input() patientId: String
  @Input() triage: Triage
  @Input() baby: boolean
  @Input() fastTrack: boolean

  constructor() { }

  ngOnInit() {
    console.log(this.fastTrack)
  }

}
