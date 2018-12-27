import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components to import
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
// Authentification
import { AuthComponent } from './auth/auth.component';
// Home page
import { HomeComponent } from './home/home.component';
import { LastEventComponent } from './last-event/last-event.component';
import { LovePicsComponent } from './love-pics/love-pics.component';
// Galeries
import { GaleriesComponent } from './galeries/galeries.component';
import { GalerieEventsComponent } from './galerie-events/galerie-events.component';
import { EventPhotoComponent } from './event-photo/event-photo.component';
import { EventComponent } from './event/event.component';
// Members page
import { MembersComponent } from './members/members.component';
import { TeamPontheYearComponent } from './team-ponthe-year/team-ponthe-year.component';
// Material page
import { MaterialComponent } from './material/material.component';
// Error 404 page
import { NotfoundComponent } from './notfound/notfound.component';

// Services to import
import { HomeService } from './services/home.service';
import { GaleriesService } from './services/galeries.service';
import { MembersService } from './services/members.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    HomeComponent,
    GaleriesComponent,
    MembersComponent,
    TeamPontheYearComponent,
    LastEventComponent,
    LovePicsComponent,
    GalerieEventsComponent,
    EventPhotoComponent,
    MaterialComponent,
    EventComponent,
    NotfoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService,
    GaleriesService,
    MembersService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
