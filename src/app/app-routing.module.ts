import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Service which protects the routes
import { AuthGuard } from './services/auth-guard.service';

//// COMPONENTS
import { AppComponent } from './app.component';
import { AuthComponent} from './auth/auth.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { CguComponent } from './cgu/cgu.component';
import { ResetComponent } from './reset/reset.component';
import { HomeComponent } from './home/home.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { MaterialComponent } from './material/material.component';
import { EventComponent } from './event/event.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ModerationComponent } from './moderation/moderation.component';
import { VideoComponent } from './video/video.component';


const routes: Routes = [
  { path : '', canActivate : [AuthGuard], component : HomeComponent },
  { path : 'auth', component : AuthComponent, data:{animation:'AuthPage'} },
  { path : 'new-account', component : NewAccountComponent, data:{animation: 'NewAccountPage'} },
  { path : 'cgu', component : CguComponent, data:{animation:'CguPage'} },
  { path : 'reset', component : ResetComponent, data:{animation:'ResetPage'} },
  { path : 'home', canActivate : [AuthGuard], component : HomeComponent, data:{animation:'HomePage'} },
  { path : 'galeries', canActivate : [AuthGuard], component : GaleriesComponent, data:{animation:'GaleriesPage'} },
  { path : 'pics', redirectTo : '/galeries' },
  { path : 'dashboard', canActivate : [AuthGuard], component : DashboardComponent, data:{animation:'DashboardPage'} },
  { path : 'dash', redirectTo : '/dashboard' },
  { path : 'board', redirectTo : '/dashboard' },
  { path : 'moderation', canActivate : [AuthGuard], component : ModerationComponent, data:{animation:'ModerationPage'} },
  { path : 'modo', redirectTo : '/moderation' },
  { path : 'members', canActivate : [AuthGuard], component : MembersComponent, data:{animation:'MembersPage'} },
  { path : 'membres', redirectTo : '/members' },
  { path : 'material', canActivate : [AuthGuard], component : MaterialComponent, data:{animation:'MaterialPage'} },
  { path : 'matos', redirectTo : '/material' },
  { path : 'galeries/video/:video', canActivate : [AuthGuard], component : VideoComponent, data:{animation:'VideoComponent'} },
  { path : 'galeries/pics/:event', canActivate : [AuthGuard], component : EventComponent, data:{animation:'EventPage'} },
  { path : 'not-found', canActivate : [AuthGuard], component : NotfoundComponent },
  { path : '**', redirectTo : '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
