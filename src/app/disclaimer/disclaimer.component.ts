import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations'


@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css'],
  animations: [
    trigger('toggleState', [
      state('true' , style({  })),
      state('false', style({ maxHeight: 0, padding: 0, display: 'none' })),
      // transition
      transition('* => *', animate('3000ms')),
    ])
  ],
})
export class DisclaimerComponent implements OnInit {

  @Input() shouldToggle = false;

  constructor() { }

  ngOnInit() {
  }

}
