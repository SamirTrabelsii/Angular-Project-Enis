import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
  //ordre important
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path:'members',
    pathMatch:'full',
    component:MemberComponent
  },
  {
    path:'MemberForm',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:'EventCreate',
    pathMatch:'full',
    component:EventCreateComponent
  },
  {
    path:'dashboard',
    pathMatch:'full',
    component:DashboardComponent
  },
  {
    path:'tools',
    pathMatch:'full',
    component:ToolsComponent
  },
  {
    path:'articles',
    pathMatch:'full',
    component:ArticlesComponent
  },
  {
    path:'events',
    pathMatch:'full',
    component:EventsComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:'edit/event/:id',
    pathMatch:'full',
    component:EventCreateComponent
  },
  {
    path:'**',
     
    redirectTo:'members'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
