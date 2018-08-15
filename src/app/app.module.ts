import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { QueueComponent } from './queue/queue.component';
import { QueueRowComponent } from './queue-row/queue-row.component';
import { QueueSectionComponent } from './queue-section/queue-section.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// Modules from outside

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    QueueComponent,
    QueueRowComponent,
    QueueSectionComponent,
    DashboardComponent,
    ProfileComponent,
    UserMenuComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
