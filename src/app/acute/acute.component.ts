import { Component, OnInit, Input } from '@angular/core';
import { PusherService } from '../pusher.service';
import { AdminServiceService } from '../admin/admin-service.service';

@Component({
  selector: 'app-acute',
  templateUrl: './acute.component.html',
  styleUrls: ['./acute.component.css']
})
export class AcuteComponent implements OnInit {

  @Input() acutePatients: number

  constructor(private pusherService: PusherService, private adminService: AdminServiceService) { 
   this.getPatientOptions()
  }

  ngOnInit() {
    this.acutePatients = 0;
    
    this.pusherService.channel.bind('new-option', data => {
      this.getPatientOptions()
    });
  }

  private getPatientOptions() {
    this.adminService.getOptions().subscribe(
      data => { console.log("Options found"), this.acutePatients = data[0].acutePatients },
      error => { console.log("Error", error) }
    )
  }

}
