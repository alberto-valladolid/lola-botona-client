import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './_components/profile/profile.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { AdminPanelComponent } from './_components/admin-panel/admin-panel.component';
import { AddUserComponent } from './_components/admin-panel/add-user/add-user.component';
import { EditUserComponent } from './_components/admin-panel/edit-user/edit-user.component';

import{AuthGuard} from "./_guards/auth.guard"; 

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/user/add', component: AddUserComponent, canActivate:[AuthGuard]},
  { path: 'admin/user/edit/:id', component: EditUserComponent, canActivate:[AuthGuard]},
  { path: 'admin', component: AdminPanelComponent, canActivate:[AuthGuard]},
  { path: 'admin', component: AdminPanelComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '404-pagina-no-encontrada',  pathMatch: 'full' },
  { path: '404-pagina-no-encontrada', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }