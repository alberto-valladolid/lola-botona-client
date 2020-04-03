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
import { AddComponent } from './_components/admin-panel/group/add/add.component';
import { EditComponent } from './_components/admin-panel/group/edit/edit.component';
import { AbsenceComponent } from './_components/admin-panel/user_group/absence/absence.component';
import { RetrieveComponent } from './_components/admin-panel/user_group/retrieve/retrieve.component';


import{AuthGuard} from "./_guards/auth.guard"; 

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/user/add', component: AddUserComponent, canActivate:[AuthGuard]},
  { path: 'admin/user/edit/:id', component: EditUserComponent, canActivate:[AuthGuard]},
  { path: 'admin/user', component: AdminPanelComponent, canActivate:[AuthGuard]},
  { path: 'admin/group', component: GroupComponent, canActivate:[AuthGuard]},
  { path: 'admin/group/add', component: AddComponent, canActivate:[AuthGuard]},
  { path: 'admin/group/edit/:id', component: EditComponent, canActivate:[AuthGuard]},
  { path: 'admin/absence', component: AbsenceComponent, canActivate:[AuthGuard]},
  { path: 'admin/retrieve', component: RetrieveComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '404-pagina-no-encontrada',  pathMatch: 'full' },
  { path: '404-pagina-no-encontrada', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }