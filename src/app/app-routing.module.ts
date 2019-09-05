import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routesApp } from './Routes';

// Service which protects the routes
import { AuthGuard } from './services/auth-guard.service';

//// COMPONENTS
import { AuthComponent} from './pages/auth/auth.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { GaleriesComponent } from './pages/galeries/galeries.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MembersComponent } from './pages/members/members.component';
import { MaterialComponent } from './pages/material/material.component';
import { EventComponent } from './pages/event/event.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ModerationComponent } from './pages/moderation/moderation.component';
import { VideoComponent } from './pages/video/video.component';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: routesApp.auth, component: AuthComponent, data: {animation: 'AuthPage'} },
  { path: routesApp.newAccount, component: NewAccountComponent, data: {animation: 'NewAccountPage'} },
  { path: routesApp.cgu, component: CguComponent, data: {animation: 'CguPage'} },
  { path: routesApp.reset, component: ResetComponent, data: {animation: 'ResetPage'} },
  { path: routesApp.home, canActivate: [AuthGuard], component: HomeComponent, data: {animation: 'HomePage'} },
  { path: routesApp.galeries, canActivate: [AuthGuard], component: GaleriesComponent, data: {animation: 'GaleriesPage'} },
  { path: 'pics', redirectTo: routesApp.galeries },
  { path: 'video', redirectTo: routesApp.galeries },
  { path: routesApp.dashboard, canActivate: [AuthGuard], component: DashboardComponent, data: {animation: 'DashboardPage'} },
  { path: 'dash', redirectTo: routesApp.dashboard },
  { path: 'board', redirectTo: routesApp.dashboard },
  { path: routesApp.moderation, canActivate: [AuthGuard], component: ModerationComponent, data: {animation: 'ModerationPage'} },
  { path: 'modo', redirectTo: routesApp.moderation },
  { path: routesApp.members, canActivate: [AuthGuard], component: MembersComponent, data: {animation: 'MembersPage'} },
  { path: 'membres', redirectTo: routesApp.members },
  { path: routesApp.material, canActivate: [AuthGuard], component: MaterialComponent, data: {animation: 'MaterialPage'} },
  { path: 'matos', redirectTo: routesApp.material },
  { path: routesApp.videos + ':video', canActivate: [AuthGuard], component: VideoComponent, data: {animation: 'VideoComponent'} },
  { path: routesApp.pics + ':event', canActivate: [AuthGuard], component: EventComponent, data: {animation: 'EventPage'} },
  { path: routesApp.notFound, canActivate: [AuthGuard], component: NotfoundComponent },
  { path: '**', redirectTo: routesApp.notFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
