//// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Module for all the various forms of the application
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Module for component animations and page transitions
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Module for HTTP requests
import { HttpClientModule } from '@angular/common/http';
// Upload file module
import { FilePickerModule } from 'ngx-awesome-uploader';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

//// COMPONENTS
import { AdminUsefulLinksComponent } from './components/dashboard/admin-useful-links/admin-useful-links.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthBgSliderComponent } from './components/auth/auth-bg-slider/auth-bg-slider.component';
import { AuthCardComponent } from './components/auth/auth-card/auth-card.component';
import { AuthFooterComponent } from './components/auth/auth-footer/auth-footer.component';
import { AuthNavComponent } from './components/auth/auth-nav/auth-nav.component';
import { CsvImportFormComponent } from './components/dashboard/csv-import-form/csv-import-form.component';
import { DashboardFormComponent } from './components/dashboard/dashboard-form/dashboard-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriesContactFormComponent } from './components/galeries/galeries-contact-form/galeries-contact-form.component';
import { GaleriesFooterComponent } from './components/galeries/galeries-footer/galeries-footer.component';
import {
  GaleriesModerationButtonsComponent
} from './components/galeries/galeries-moderation-buttons/galeries-moderation-buttons.component';
import { GalleryCreationFormComponent } from './components/dashboard/gallery-creation-form/gallery-creation-form.component';
import { HomeFormComponent } from './components/home/home-form/home-form.component';
import { IconLinksComponent } from './components/icon-links/icon-links.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LoaderPontheComponent } from './components/loaders/loader-ponthe/loader-ponthe.component';
import { LoadingPointsComponent } from './components/loaders/loading-points/loading-points.component';
import { LoadingSpinnerComponent } from './components/loaders/loading-spinner/loading-spinner.component';
import { LovePicsComponent } from './components/home/love-pics/love-pics.component';
import { MaterialBookingFormComponent } from './components/material-booking-form/material-booking-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavComponent } from './components/navigation/nav/nav.component';
import { NavLinkComponent } from './components/navigation/nav-link/nav-link.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { PicThumbComponent } from './components/pic-thumb/pic-thumb.component';
import { PrivateGalleriesComponent } from './components/dashboard/private-galleries/private-galleries.component';
import { PontheTeamComponent } from './components/members/ponthe-team/ponthe-team.component';
import { ReactionIconComponent } from './components/reactions/reaction-icon/reaction-icon.component';
import { ReactionsComponent } from './components/reactions/reactions/reactions.component';
import { TutorialSubjectComponent } from './components/dashboard/tutorial-subject/tutorial-subject.component';
import { TutorialsComponent } from './components/dashboard/tutorials/tutorials.component';
import { UploadComponent } from './components/upload/upload.component';
import { VideoViewerComponent } from './components/galeries/video-viewer/video-viewer.component';

//// PAGES
import { AuthComponent } from './pages/auth/auth.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { CrushComponent } from './pages/crush/crush.component';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { VestibuleComponent } from './pages/vestibule/vestibule.component';
import { GaleriesComponent } from './pages/galeries/galeries.component';
import { EventComponent } from './pages/event/event.component';
import { FilmographyComponent } from './pages/filmography/filmography.component';
import { VideoComponent } from './pages/video/video.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModerationComponent } from './pages/moderation/moderation.component';
import { MembersComponent } from './pages/members/members.component';
import { MaterialComponent } from './pages/material/material.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

// SERVICES
import { AdminGuard } from './services/admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BreakpointsService } from './services/breakpoints.service';
import { GaleriesService } from './services/galeries.service';
import { HomeService } from './services/home.service';
import { HttpService } from './services/http.service';
import { MembersService } from './services/members.service';
import { MessagesService } from './services/messages.service';
import { PicsService } from './services/pics.service';
import { PwaService } from './services/Pwa.service';
import { ReactionsService } from './services/reactions.service';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './services/translate.pipe';
import { UserService } from './services/user.service';
import { VideoService } from './services/video.service';


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
