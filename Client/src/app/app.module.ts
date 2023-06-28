import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
// Services
import { AuthGuard } from "./auth/auth.guard"
// PrimeNg
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
// Components
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { ChatSignupComponent } from './chat-signup/chat-signup.component';
import { ChatLoginComponent } from './chat-login/chat-login.component';
import { ChatProfileComponent } from './chat-profile/chat-profile.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChatLoadingComponent } from './chat-loading/chat-loading.component';
import { ChatRoomMessageComponent } from './chat-room-message/chat-room-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ChatDashboardComponent,
    ChatSignupComponent,
    ChatLoginComponent,
    ChatProfileComponent,
    DialogComponent,
    ChatLoadingComponent,
    ChatRoomMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    FormsModule,
    InputTextModule,
    DividerModule,
    SlideMenuModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    InputNumberModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
