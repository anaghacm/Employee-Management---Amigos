import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/home/home.component';
import { LoginComponent } from './homepage/login/login.component';
import { InfoComponent } from './homepage/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './homepage/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { HrHomeComponent } from './hr-dashboard/hr-home/hr-home.component';
import { EmpHomeComponent } from './emp-dashboard/emp-home/emp-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InfoComponent,
    ForgotPasswordComponent,
    HrHomeComponent,
    EmpHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
