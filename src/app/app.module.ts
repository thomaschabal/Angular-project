//// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
// Routing
import { AppRoutingModule } from '@src/app/app-routing.module';
// Module for all the various forms of the application
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Module for component animations and page transitions
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Module for HTTP requests
import { HttpClientModule } from '@angular/common/http';
// Upload file module
import { FilePickerModule } from 'ngx-awesome-uploader';

import { environment } from '@src/environments/environment';

import { AppComponent } from '@src/app/app.component';

//// COMPONENTS
import { AdminUsefulLinksComponent } from '@src/app/components/dashboard/admin-useful-links/admin-useful-links.component';
import { AlertComponent } from '@src/app/components/alert/alert.component';
import { AuthBgSliderComponent } from '@src/app/components/auth/auth-bg-slider/auth-bg-slider.component';
import { AuthCardComponent } from '@src/app/components/auth/auth-card/auth-card.component';
import { AuthFooterComponent } from '@src/app/components/auth/auth-footer/auth-footer.component';
import { AuthNavComponent } from '@src/app/components/auth/auth-nav/auth-nav.component';
import { CsvImportFormComponent } from '@src/app/components/dashboard/csv-import-form/csv-import-form.component';
import { DashboardFormComponent } from '@src/app/components/dashboard/dashboard-form/dashboard-form.component';
import { FooterComponent } from '@src/app/components/footer/footer.component';
import { GaleriesContactFormComponent } from '@src/app/components/galeries/galeries-contact-form/galeries-contact-form.component';
import { GaleriesFooterComponent } from '@src/app/components/galeries/galeries-footer/galeries-footer.component';
import {
  GaleriesModerationButtonsComponent
} from '@src/app/components/galeries/galeries-moderation-buttons/galeries-moderation-buttons.component';
import { GalleryCreationFormComponent } from '@src/app/components/dashboard/gallery-creation-form/gallery-creation-form.component';
import { HomeFormComponent } from '@src/app/components/home/home-form/home-form.component';
import { IconLinksComponent } from '@src/app/components/icon-links/icon-links.component';
import { ImageViewerComponent } from '@src/app/components/image-viewer/image-viewer.component';
import { LanguageSelectionComponent } from '@src/app/components/language-selection/language-selection.component';
import { LoaderPontheComponent } from '@src/app/components/loaders/loader-ponthe/loader-ponthe.component';
import { LoadingPointsComponent } from '@src/app/components/loaders/loading-points/loading-points.component';
import { LoadingSpinnerComponent } from '@src/app/components/loaders/loading-spinner/loading-spinner.component';
import { LovePicsComponent } from '@src/app/components/home/love-pics/love-pics.component';
import { MaterialBookingFormComponent } from '@src/app/components/material-booking-form/material-booking-form.component';
import { ModalComponent } from '@src/app/components/modal/modal.component';
import { NavComponent } from '@src/app/components/navigation/nav/nav.component';
import { NavLinkComponent } from '@src/app/components/navigation/nav-link/nav-link.component';
import { NavigationButtonComponent } from '@src/app/components/navigation-button/navigation-button.component';
import { PicThumbComponent } from '@src/app/components/pic-thumb/pic-thumb.component';
import { PrivateGalleriesComponent } from '@src/app/components/dashboard/private-galleries/private-galleries.component';
import { PontheTeamComponent } from '@src/app/components/members/ponthe-team/ponthe-team.component';
import { ReactionIconComponent } from '@src/app/components/reactions/reaction-icon/reaction-icon.component';
import { ReactionsComponent } from '@src/app/components/reactions/reactions/reactions.component';
import { ReactionsVideosComponent } from '@src/app/components/reactions/reactions-videos/reactions-videos.component';
import { TutorialSubjectComponent } from '@src/app/components/dashboard/tutorial-subject/tutorial-subject.component';
import { TutorialsComponent } from '@src/app/components/dashboard/tutorials/tutorials.component';
import { UploadComponent } from '@src/app/components/upload/upload.component';
import { VideoViewerComponent } from '@src/app/components/galeries/video-viewer/video-viewer.component';

//// PAGES
import { AuthComponent } from '@src/app/pages/auth/auth.component';
import { NewAccountComponent } from '@src/app/pages/new-account/new-account.component';
import { CguComponent } from '@src/app/pages/cgu/cgu.component';
import { CrushComponent } from '@src/app/pages/crush/crush.component';
import { ResetComponent } from '@src/app/pages/reset/reset.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { VestibuleComponent } from '@src/app/pages/vestibule/vestibule.component';
import { GaleriesComponent } from '@src/app/pages/galeries/galeries.component';
import { EventComponent } from '@src/app/pages/event/event.component';
import { FilmographyComponent } from '@src/app/pages/filmography/filmography.component';
import { VideoComponent } from '@src/app/pages/video/video.component';
import { DashboardComponent } from '@src/app/pages/dashboard/dashboard.component';
import { ModerationComponent } from '@src/app/pages/moderation/moderation.component';
import { MembersComponent } from '@src/app/pages/members/members.component';
import { MaterialComponent } from '@src/app/pages/material/material.component';
import { NotfoundComponent } from '@src/app/pages/notfound/notfound.component';

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


export function setupTranslateFactory(
  service: TranslateService): () => void {
  return () => service.use('fr');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminUsefulLinksComponent,
    AlertComponent,
    AuthBgSliderComponent,
    AuthCardComponent,
    AuthFooterComponent,
    AuthNavComponent,
    CsvImportFormComponent,
    DashboardFormComponent,
    FooterComponent,
    GaleriesContactFormComponent,
    GaleriesFooterComponent,
    GaleriesModerationButtonsComponent,
    GalleryCreationFormComponent,
    HomeFormComponent,
    IconLinksComponent,
    ImageViewerComponent,
    LanguageSelectionComponent,
    LoaderPontheComponent,
    LoadingPointsComponent,
    LoadingSpinnerComponent,
    LovePicsComponent,
    MaterialBookingFormComponent,
    ModalComponent,
    NavComponent,
    NavLinkComponent,
    NavigationButtonComponent,
    PicThumbComponent,
    PontheTeamComponent,
    PrivateGalleriesComponent,
    ReactionIconComponent,
    ReactionsComponent,
    ReactionsVideosComponent,
    TutorialSubjectComponent,
    TutorialsComponent,
    UploadComponent,
    VideoViewerComponent,
    AuthComponent,
    CguComponent,
    CrushComponent,
    DashboardComponent,
    EventComponent,
    FilmographyComponent,
    GaleriesComponent,
    HomeComponent,
    MaterialComponent,
    MembersComponent,
    ModerationComponent,
    NewAccountComponent,
    NotfoundComponent,
    ResetComponent,
    VestibuleComponent,
    VideoComponent,
    TranslatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FilePickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [
        TranslateService
      ],
      multi: true
    },
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
