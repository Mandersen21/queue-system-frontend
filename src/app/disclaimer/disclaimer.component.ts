import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations'


@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css'],
})
export class DisclaimerComponent implements OnInit {

  infoMessages: Array<IMessage> = [];

  currentMessage: IMessage
  @Input() errorMessage: IMessage

  constructor() {

    if (this.errorMessage) {
      this.currentMessage = this.errorMessage;
      this.currentMessage.error = true;
    }
    else {
      this.currentMessage = {message: 'Velkommen til akutmodtagelsen - Vi vil gøre vores bedste for at du kan komme i behandling indenfor rimelig tid.', error: false}
    }
  }

  ngOnInit() {}
}

export interface IMessage {
  message: string,
  error: boolean,
}