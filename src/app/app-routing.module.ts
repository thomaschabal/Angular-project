import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { MembersComponent } from './members/members.component';
import { MaterialComponent } from './material/material.component';
import { AuthComponent} from './auth/auth.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path : '', component : AuthComponent },
  { path : 'auth', component : AuthComponent},
  { path : 'home', component : HomeComponent },
  { path : 'galeries', component : GaleriesComponent },
  { path : 'members', component : MembersComponent },
  { path : 'material', component : MaterialComponent },
  { path : 'galeries/:event', component : EventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
