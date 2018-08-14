import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';

// Modules from outside
import { CalendarModule } from 'primeng/calendar';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { QueueComponent } from './queue/queue.component';
import { QueueRowComponent } from './queue-row/queue-row.component';
import { QueueSectionComponent } from './queue-section/queue-section.component';


@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    QueueComponent,
    QueueRowComponent,
    QueueSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
