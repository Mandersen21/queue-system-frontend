import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from 'src/app/content/content.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent, data: { state: 'dashboard' }},
  { path: 'content', component: ContentComponent, data: { state: 'content' } },
  { path: 'user', component: UserProfileComponent, data: { state: 'user' } },
  { path: 'admin', component: AdminComponent, data: { state: 'admin' } }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), FormsModule, HttpClientModule ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
