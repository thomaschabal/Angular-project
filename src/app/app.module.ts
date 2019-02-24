//// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Image Viewer module
import { ImageViewerModule } from "ngx-image-viewer";
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

//// COMPONENTS
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
// Authentification, registering and reset of the password
import { AuthComponent } from './auth/auth.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { CguComponent } from './cgu/cgu.component';
import { ResetComponent } from './reset/reset.component';
// Home page
import { HomeComponent } from './home/home.component';
// Galeries
import { GaleriesComponent } from './galeries/galeries.component';
import { EventComponent } from './event/event.component';
// Dashboard for uploading images and videos
import { DashboardComponent } from './dashboard/dashboard.component';
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
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FilePickerModule,
    ImageViewerModule.forRoot()
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
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
