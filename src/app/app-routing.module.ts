import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './_components/profile/profile.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { AdminPanelComponent } from './_components/admin-panel/user/admin-panel.component';
import { AddUserComponent } from './_components/admin-panel/user/add-user/add-user.component';
import { EditUserComponent } from './_components/admin-panel/user/edit-user/edit-user.component';
import { GroupComponent } from './_components/admin-panel/group/group.component';
import { AddGroupComponent } from './_components/admin-panel/group/add-group/add-group.component';
import { EditGroupComponent } from './_components/admin-panel/group/edit-group/edit-group.component';
import { AssistsComponent }  from './_components/admin-panel/user_group/assists/assists.component';

import { FeastDayComponent } from './_components/admin-panel/feast-day/feast-day.component';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { AddFeastComponent } from './_components/admin-panel/feast-day/add-feast/add-feast.component';
import { AppConfigComponent } from './_components/admin-panel/app-config/app-config.component';


import{AuthGuard} from "./_guards/auth.guard"; 

const routes: Routes = [
  { path: 'home', component: CalendarComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/user/add', component: AddUserComponent, canActivate:[AuthGuard]},
  { path: 'admin/user/edit/:id', component: EditUserComponent, canActivate:[AuthGuard]},
  { path: 'admin/user', component: AdminPanelComponent, canActivate:[AuthGuard]},
  { path: 'admin/group', component: GroupComponent, canActivate:[AuthGuard]},
  { path: 'admin/app-config', component: AppConfigComponent, canActivate:[AuthGuard]},
  { path: 'admin/group/add', component: AddGroupComponent, canActivate:[AuthGuard]},
  { path: 'admin/group/edit/:id', component: EditGroupComponent, canActivate:[AuthGuard]},
  { path: 'admin/feast-day', component: FeastDayComponent, canActivate:[AuthGuard]},
  { path: 'admin/feast-day/add', component: AddFeastComponent, canActivate:[AuthGuard]},
  { path: 'admin/event', component: AssistsComponent, canActivate:[AuthGuard]},  
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '404-pagina-no-encontrada',  pathMatch: 'full' },
  { path: '404-pagina-no-encontrada', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }