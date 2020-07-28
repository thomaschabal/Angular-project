import { Routes } from '@angular/router';
import { routesApp } from '@src/app/Routes';

// Service which protects the routes
import { AdminGuard } from '@src/app/services/admin-guard.service';
import { AuthGuard } from '@src/app/services/auth-guard.service';

//// COMPONENTS
import { AuthComponent} from '@src/app/pages/auth/auth.component';
import { NewAccountComponent } from '@src/app/pages/new-account/new-account.component';
import { CguComponent } from '@src/app/pages/cgu/cgu.component';
import { ResetComponent } from '@src/app/pages/reset/reset.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { VestibuleComponent } from '@src/app/pages/vestibule/vestibule.component';
import { FilmographyComponent } from '@src/app/pages/filmography/filmography.component';
import { GaleriesComponent } from '@src/app/pages/galeries/galeries.component';
import { CrushComponent } from '@src/app/pages/crush/crush.component';
import { DashboardComponent } from '@src/app/pages/dashboard/dashboard.component';
import { MembersComponent } from '@src/app/pages/members/members.component';
import { MaterialComponent } from '@src/app/pages/material/material.component';
import { EventComponent } from '@src/app/pages/event/event.component';
import { NotfoundComponent } from '@src/app/pages/notfound/notfound.component';
import { ModerationComponent } from '@src/app/pages/moderation/moderation.component';
import { VideoComponent } from '@src/app/pages/video/video.component';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  // { path: '', component: MembersComponent },

  { path: routesApp.auth, component: AuthComponent, data: {animation: 'AuthPage'} },
  { path: routesApp.newAccount, component: NewAccountComponent, data: {animation: 'NewAccountPage'} },
  { path: routesApp.cgu, component: CguComponent, data: {animation: 'CguPage'} },
  { path: routesApp.reset, component: ResetComponent, data: {animation: 'ResetPage'} },

  { path: routesApp.home, canActivate: [AuthGuard], component: HomeComponent, data: {animation: 'HomePage'} },

  { path: routesApp.galeries, canActivate: [AuthGuard], component: VestibuleComponent, data: {animation: 'VestibulePage'} },
  { path: routesApp.pics, canActivate: [AuthGuard], component: GaleriesComponent, data: {animation: 'GaleriesPage'} },
  { path: 'pics', redirectTo: routesApp.pics },
  { path: 'photo', redirectTo: routesApp.pics },
  { path: routesApp.pics + '/:event', canActivate: [AuthGuard], component: EventComponent, data: {animation: 'EventPage'} },
  { path: routesApp.videos, canActivate: [AuthGuard], component: FilmographyComponent, data: {animation: 'FilmographyPage'} },
  { path: 'video', redirectTo: routesApp.videos },
  { path: 'movies', redirectTo: routesApp.videos },
  { path: routesApp.videos + '/:video', canActivate: [AuthGuard], component: VideoComponent, data: {animation: 'VideoComponent'} },

  { path: routesApp.crush, canActivate: [AuthGuard], component: CrushComponent, data: {animation: 'CrushPage'} },

//   { path: routesApp.dashboard, canActivate: [AuthGuard, AdminGuard], component: DashboardComponent, data: {animation: 'DashboardPage'} },
//   { path: 'dash', redirectTo: routesApp.dashboard },
//   { path: 'board', redirectTo: routesApp.dashboard },
//   { path: 'admin', redirectTo: routesApp.dashboard },
  { path: routesApp.moderation, canActivate: [AuthGuard, AdminGuard], component: ModerationComponent, data: {animation: 'ModerationPage'} },
  { path: 'modo', redirectTo: routesApp.moderation },

  { path: routesApp.members, canActivate: [AuthGuard], component: MembersComponent, data: {animation: 'MembersPage'} },
  { path: 'membres', redirectTo: routesApp.members },

  { path: routesApp.material, canActivate: [AuthGuard], component: MaterialComponent, data: {animation: 'MaterialPage'} },
  { path: 'matos', redirectTo: routesApp.material },

  { path: routesApp.notFound, canActivate: [AuthGuard], component: NotfoundComponent },
  { path: '**', canActivate: [AuthGuard], redirectTo: routesApp.notFound }
];
