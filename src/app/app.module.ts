import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { NavComponent } from './_components/nav/nav.component';
import { AdminPanelComponent } from './_components/admin-panel/admin-panel.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { DataTablesModule } from 'angular-datatables';
import { AddUserComponent } from './_components/admin-panel/add-user/add-user.component';
import { EditUserComponent } from './_components/admin-panel/edit-user/edit-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './_components/_dialogs/delete-user-dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './_components/profile/profile.component';
import { ChangePasswordDialogComponent } from './_components/_dialogs/change-password-dialog/change-password-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AdminPanelComponent,
    AddUserComponent,
    EditUserComponent,
    DialogComponent,
    ProfileComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
