import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules from outside
import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';

// Components
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { QueueComponent } from './queue/queue.component';
import { QueueRowComponent } from './queue-row/queue-row.component';
import { QueueSectionComponent } from './queue-section/queue-section.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TestComponent } from './test/test.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    QueueComponent,
    QueueRowComponent,
    QueueSectionComponent,
    DashboardComponent,
    UserMenuComponent,
    UserProfileComponent,
    TestComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppBoostrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
