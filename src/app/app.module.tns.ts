import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms'

import { AppRoutingModule } from '@src/app/app-routing.module.tns';
import { AppComponent } from '@src/app/app.component';
import { AuthComponent } from '@src/app/pages/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptSvgModule } from 'nativescript-svg/angular';


// SERVICES
import { AdminGuard } from '@src/app/services/admin-guard.service';
import { AuthGuard } from '@src/app/services/auth-guard.service';
import { AuthService } from '@src/app/services/auth.service';
import { BreakpointsService } from '@src/app/services/breakpoints.service';
import { GaleriesService } from '@src/app/services/galeries.service';
import { HomeService } from '@src/app/services/home.service';
import { HttpService } from '@src/app/services/http.service';
import { MembersService } from '@src/app/services/members.service';
import { MessagesService } from '@src/app/services/messages.service';
import { PicsService } from '@src/app/services/pics.service';
import { PwaService } from '@src/app/services/Pwa.service';
import { ReactionsService } from '@src/app/services/reactions.service';
import { TranslateService } from '@src/app/services/translate.service';
import { TranslatePipe } from '@src/app/services/translate.pipe';
import { UserService } from '@src/app/services/user.service';
import { VideoService } from '@src/app/services/video.service';
import { CguComponent } from '@src/app/pages/cgu/cgu.component';
import { NotfoundComponent } from '@src/app/pages/notfound/notfound.component';
import { NewAccountComponent } from '@src/app/pages/new-account/new-account.component';
import { ResetComponent } from '@src/app/pages/reset/reset.component';
import { MaterialComponent } from '@src/app/pages/material/material.component';
import { NavComponent } from '@src/app/components/navigation/nav/nav.component';
import { NavLinkComponent } from '@src/app/components/navigation/nav-link/nav-link.component';
import { AuthNavComponent } from '@src/app/components/auth/auth-nav/auth-nav.component';
import { MaterialBookingFormComponent } from '@src/app/components/material-booking-form/material-booking-form.component';
import { GaleriesComponent } from '@src/app/pages/galeries/galeries.component';
import { AuthFooterComponent } from '@src/app/components/auth/auth-footer/auth-footer.component';
import { FilmographyComponent } from '@src/app/pages/filmography/filmography.component';
import { CrushComponent } from '@src/app/pages/crush/crush.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { LovePicsComponent } from '@src/app/components/home/love-pics/love-pics.component';
import { HomeFormComponent } from '@src/app/components/home/home-form/home-form.component';
import { EventComponent } from '@src/app/pages/event/event.component';
import { InfiniteScrollComponent } from '@src/app/components/infinite-scroll/infinite-scroll.component';
import { ActionBarComponent } from '@src/app/components/action-bar/action-bar.component';
import { VideoComponent } from '@src/app/pages/video/video.component';
import { MembersComponent } from '@src/app/pages/members/members.component';
import { VestibuleComponent } from '@src/app/pages/vestibule/vestibule.component';
import { ModerationComponent } from '@src/app/pages/moderation/moderation.component';
import { PontheTeamComponent } from '@src/app/components/members/ponthe-team/ponthe-team.component';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

export function setupTranslateFactory(
  service: TranslateService): () => void {
  return () => service.use('fr');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CguComponent,
    TranslatePipe,
    NotfoundComponent,
    NewAccountComponent,
    ResetComponent,
    MaterialComponent,
    NavComponent,
    NavLinkComponent,
    AuthNavComponent,
    MaterialBookingFormComponent,
    GaleriesComponent,
    AuthFooterComponent,
    FilmographyComponent,
    CrushComponent,
    HomeComponent,
    LovePicsComponent,
    HomeFormComponent,
    EventComponent,
    InfiniteScrollComponent,
    ActionBarComponent,
    VideoComponent,
    MembersComponent,
    VestibuleComponent,
    ModerationComponent,
    PontheTeamComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NativeScriptUISideDrawerModule,
    NativeScriptFormsModule,
    NativeScriptSvgModule,
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    AuthService,
    BreakpointsService,
    GaleriesService,
    HomeService,
    HttpService,
    MembersService,
    MessagesService,
    PicsService,
    PwaService,
    ReactionsService,
    TranslateService,
    VideoService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: setupTranslateFactory,
    //   deps: [
    //     TranslateService
    //   ],
    //   multi: true
    // },
    UserService,
  ],

  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
