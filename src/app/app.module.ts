//// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

//// COMPONENTS
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
// Authentification, registering and reset of the password
import { AuthComponent } from './auth/auth.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { CguComponent } from './cgu/cgu.component';
import { ResetComponent } from './reset/reset.component';
import { UserListComponent } from './user-list/user-list.component';
// Home page
import { HomeComponent } from './home/home.component';
// Loading spinner
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
// Galeries
import { GaleriesComponent } from './galeries/galeries.component';
import { GaleriesContactFormComponent } from './galeries-contact-form/galeries-contact-form.component';
import { GaleriesFooterComponent } from './galeries-footer/galeries-footer.component';
import { UploadComponent } from './upload/upload.component';
import { GaleriesModerationButtonsComponent } from './galeries-moderation-buttons/galeries-moderation-buttons.component';
import { EventComponent } from './event/event.component';
import { VideoComponent } from './video/video.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
// Dashboard for uploading images and videos
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModerationComponent } from './moderation/moderation.component';
// Members page
import { MembersComponent } from './members/members.component';
// Material page
import { MaterialComponent } from './material/material.component';
// Error 404 page
import { NotfoundComponent } from './notfound/notfound.component';

// SERVICES
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { GaleriesService } from './services/galeries.service';
import { HomeService } from './services/home.service';
import { HttpService } from './services/http.service';
import { MembersService } from './services/members.service';
import { MessagesService } from './services/messages.service';
import { UploadService } from './services/upload.service';
import { UserService } from './services/user.service';
import { PicsService } from './services/pics.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    HomeComponent,
    GaleriesComponent,
    MembersComponent,
    MaterialComponent,
    EventComponent,
    NotfoundComponent,
    FooterComponent,
    NewAccountComponent,
    DashboardComponent,
    CguComponent,
    ResetComponent,
    ModerationComponent,
    UserListComponent,
    VideoComponent,
    LoadingSpinnerComponent,
    GaleriesContactFormComponent,
    GaleriesFooterComponent,
    UploadComponent,
    GaleriesModerationButtonsComponent,
    ImageViewerComponent
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
    HomeService,
    GaleriesService,
    MembersService,
    MessagesService,
    AuthService,
    AuthGuard,
    UserService,
    ConfigService,
    HttpService,
    UploadService,
    PicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
