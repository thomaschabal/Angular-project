import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { MaterialComponent } from './material/material.component';
import { AuthComponent} from './auth/auth.component';
import { EventComponent } from './event/event.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { UserListComponent } from './user-list/user-list.component';
import { CguComponent } from './cgu/cgu.component';
import { ResetComponent } from './reset/reset.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path : '', canActivate : [AuthGuard], component : HomeComponent },
  { path : 'auth', component : AuthComponent, data:{animation:'AuthPage'} },
  { path : 'new-account', component : NewAccountComponent, data:{animation: 'NewAccountPage'} },
  { path : 'cgu', component : CguComponent, data:{animation:'CguPage'} },
  { path : 'reset', component : ResetComponent, data:{animation:'ResetPage'} },
  { path : 'users', component : UserListComponent },
  { path : 'home', component : HomeComponent, data:{animation:'HomePage'} },
  { path : 'galeries', component : GaleriesComponent, data:{animation:'GaleriesPage'} },
  { path : 'dashboard', canActivate : [AuthGuard], component : DashboardComponent, data:{animation:'DashboardPage'} },
  { path : 'members', canActivate : [AuthGuard], component : MembersComponent, data:{animation:'MembersPage'} },
  { path : 'material', canActivate : [AuthGuard], component : MaterialComponent, data:{animation:'MaterialPage'} },
  { path : 'galeries/:event', component : EventComponent, data:{animation:'EventPage'} },
  { path : 'not-found', canActivate : [AuthGuard], component : NotfoundComponent },
  { path : '**', redirectTo : '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
