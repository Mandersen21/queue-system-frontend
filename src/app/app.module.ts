import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules from outside
import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';

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
    InformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppBoostrapModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
