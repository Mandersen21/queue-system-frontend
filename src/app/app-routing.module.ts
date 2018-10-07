import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from 'src/app/content/content.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';
import { InformationComponent } from './information/information.component';
import { Information2Component } from 'src/app/information2/information2.component';
import { Information3Component } from 'src/app/information3/information3.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent, data: { state: 'dashboard' }},
  { path: 'content', component: ContentComponent, data: { state: 'content' } },
  { path: 'user', component: UserProfileComponent, data: { state: 'user' } },
  { path: 'admin', component: AdminComponent, data: { state: 'admin' } },
  { path: 'information', component: InformationComponent, data: { state: 'information' } },
  { path: 'information2', component: Information2Component, data: { state: 'information2' } },
  { path: 'information3', component: Information3Component, data: { state: 'information3' } }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), FormsModule, HttpClientModule ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
