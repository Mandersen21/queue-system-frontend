import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules from outside
import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';
import { NgxSpinnerModule } from 'ngx-spinner';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { QueueComponent } from './queue/queue.component';
import { QueueRowComponent } from './queue-row/queue-row.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AppRoutingModule } from './/app-routing.module';
import { TriageComponent } from './triage/triage.component';
import { AcuteComponent } from './acute/acute.component';
import { ClockComponent } from './clock/clock.component';
import { AdminComponent } from './admin/admin.component';
import { InformationComponent } from './information/information.component';
import { Information2Component } from './information2/information2.component';
import { Information3Component } from './information3/information3.component';
import { FastTrackComponent } from './fast-track/fast-track.component';
import { RoomComponent } from './room/room.component';

// Services
import { PusherService } from './pusher.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    QueueComponent,
    QueueRowComponent,
    DashboardComponent,
    UserProfileComponent,
    HeaderComponent,
    ContentComponent,
    TriageComponent,
    AcuteComponent,
    ClockComponent,
    AdminComponent,
    InformationComponent,
    Information2Component,
    Information3Component,
    FastTrackComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppBoostrapModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [ PusherService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
