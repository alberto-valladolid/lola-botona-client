import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { NavComponent } from './_components/nav/nav.component';
import { AdminPanelComponent } from './_components/admin-panel/user/admin-panel.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { DataTablesModule } from 'angular-datatables';
import { AddUserComponent } from './_components/admin-panel/user/add-user/add-user.component';
import { EditUserComponent } from './_components/admin-panel/user/edit-user/edit-user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './_components/_dialogs/delete-user-dialog/dialog.component';





import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

import { ProfileComponent } from './_components/profile/profile.component';
import { ChangePasswordDialogComponent } from './_components/_dialogs/change-password-dialog/change-password-dialog.component';
import { GroupComponent } from './_components/admin-panel/group/group.component';

import { AddGroupComponent } from './_components/admin-panel/group/add-group/add-group.component';
import { EditGroupComponent } from './_components/admin-panel/group/edit-group/edit-group.component';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { InfoDialogComponent } from './_components/_dialogs/info-dialog/info-dialog.component';
import { FeastDayComponent } from './_components/admin-panel/feast-day/feast-day.component';
import { AddFeastComponent } from './_components/admin-panel/feast-day/add-feast/add-feast.component';
import { AppConfigComponent } from './_components/admin-panel/app-config/app-config.component';
import { AssistsComponent } from './_components/admin-panel/user_group/assists/assists.component';





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
    ChangePasswordDialogComponent,
    GroupComponent,
    AddGroupComponent,
    EditGroupComponent,
    CalendarComponent,
    InfoDialogComponent,
    FeastDayComponent,
    AddFeastComponent,
    AppConfigComponent,
    AssistsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NoopAnimationsModule,


    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,

  ],

  providers: [authInterceptorProviders, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],


  bootstrap: [AppComponent]
})
export class AppModule { }
