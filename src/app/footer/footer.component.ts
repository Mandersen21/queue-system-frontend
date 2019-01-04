import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations'
import { PusherService } from '../pusher.service';
import { AdminServiceService } from '../admin/admin-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  infoMessages: Array<IMessage> = [];
  errorMessage: IMessage
  currentMessage: IMessage = null

  constructor(private pusherService: PusherService, private adminService: AdminServiceService) {

  }

  ngOnInit() {
    this.getPatientOptions()

    this.pusherService.channel.bind('new-option', data => {
      this.getPatientOptions()
    });
  }

  private getPatientOptions() {
    this.adminService.getOptions().subscribe(
      data => { this.errorMessage = { message: data[0].acutePatientMessage, error: false } },
      error => { console.log("Error", error) },
      () => { this.updateValues() }
    )
  }

  private updateValues() {
    if (this.errorMessage.message ) {
      this.currentMessage = { message: this.errorMessage.message, error: true}
    }
    else {
      this.currentMessage = { message: 'Velkommen til Akutmodtagelsen - Vi vil gøre vores bedste for at du kan komme i behandling indenfor rimelig tid.', error: false }
    }
  }
}

export interface IMessage {
  message: string,
  error: boolean,
}