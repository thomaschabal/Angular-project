//// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
// Video module
import { PlyrModule } from 'ngx-plyr';

import { AppComponent } from './app.component';

//// COMPONENTS
import { AlertComponent } from './components/alert/alert.component';
import { AuthBgSliderComponent } from './components/auth-bg-slider/auth-bg-slider.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { CsvImportFormComponent } from './components/csv-import-form/csv-import-form.component';
import { DashboardFormComponent } from './components/dashboard-form/dashboard-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleriesContactFormComponent } from './components/galeries-contact-form/galeries-contact-form.component';
import { GaleriesFooterComponent } from './components/galeries-footer/galeries-footer.component';
import { GaleriesModerationButtonsComponent } from './components/galeries-moderation-buttons/galeries-moderation-buttons.component';
import { GalleryCreationFormComponent } from './components/gallery-creation-form/gallery-creation-form.component';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { IconLinksComponent } from './components/icon-links/icon-links.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LoadingPointsComponent } from './components/loading-points/loading-points.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MaterialBookingFormComponent } from './components/material-booking-form/material-booking-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavComponent } from './components/nav/nav.component';
import { NavLinkComponent } from './components/nav-link/nav-link.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { PicThumbComponent } from './components/pic-thumb/pic-thumb.component';
import { PontheTeamComponent } from './components/ponthe-team/ponthe-team.component';
import { TutorialSubjectComponent } from './components/tutorial-subject/tutorial-subject.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { UploadComponent } from './components/upload/upload.component';

//// PAGES
import { AuthComponent } from './pages/auth/auth.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ResetComponent } from './pages/reset/reset.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './pages/home/home.component';
import { GaleriesComponent } from './pages/galeries/galeries.component';
import { EventComponent } from './pages/event/event.component';
import { VideoComponent } from './pages/video/video.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModerationComponent } from './pages/moderation/moderation.component';
import { MembersComponent } from './pages/members/members.component';
import { MaterialComponent } from './pages/material/material.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

// SERVICES
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { GaleriesService } from './services/galeries.service';
import { HomeService } from './services/home.service';
import { HttpService } from './services/http.service';
import { MembersService } from './services/members.service';
import { MessagesService } from './services/messages.service';
import { PicsService } from './services/pics.service';
import { PwaService } from './services/Pwa.service';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './services/translate.pipe';
import { UserService } from './services/user.service';


export function setupTranslateFactory(
  service: TranslateService): () => void {
  return () => service.use('fr');
}

@NgModule({
  declarations: [
    AppComponent,
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
    ImageViewerComponent,
    LanguageSelectionComponent,
    LoadingPointsComponent,
    LoadingSpinnerComponent,
    MaterialBookingFormComponent,
    ModalComponent,
    NavComponent,
    NavLinkComponent,
    NavigationButtonComponent,
    PicThumbComponent,
    PontheTeamComponent,
    TutorialSubjectComponent,
    TutorialsComponent,
    UploadComponent,
    AuthComponent,
    CguComponent,
    DashboardComponent,
    EventComponent,
    GaleriesComponent,
    HomeComponent,
    MaterialComponent,
    MembersComponent,
    ModerationComponent,
    NewAccountComponent,
    NotfoundComponent,
    ResetComponent,
    VideoComponent,
    UserListComponent,
    IconLinksComponent,
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
    PlyrModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    GaleriesService,
    HomeService,
    HttpService,
    MembersService,
    MessagesService,
    PicsService,
    PwaService,
    TranslateService,
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
