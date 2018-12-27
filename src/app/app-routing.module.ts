import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { MembersComponent } from './members/members.component';
import { MaterialComponent } from './material/material.component';
import { AuthComponent} from './auth/auth.component';
import { EventComponent } from './event/event.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path : '', canActivate : [AuthGuard], component : HomeComponent },
  { path : 'auth', component : AuthComponent},
  { path : 'home', canActivate : [AuthGuard], component : HomeComponent },
  { path : 'galeries', canActivate : [AuthGuard], component : GaleriesComponent },
  { path : 'members', canActivate : [AuthGuard], component : MembersComponent },
  { path : 'material', canActivate : [AuthGuard], component : MaterialComponent },
  { path : 'galeries/:event', canActivate : [AuthGuard], component : EventComponent },
  { path : 'not-found', canActivate : [AuthGuard], component : NotfoundComponent },
  { path : '**', redirectTo : '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
