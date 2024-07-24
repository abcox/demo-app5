import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './component/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.component';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { APP_CONFIG, appConfig } from './app.config';
import { PasswordResetPageComponent } from './page/password-reset-page/password-reset-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    PasswordResetPageComponent,
  ],
  imports: [
    AppRoutingModule,
    NavComponent, // todo: rename to AppNavComponent
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  //imports: [RouterOutlet, CommonModule, RouterModule, MatButton],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    ...appConfig.providers,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
