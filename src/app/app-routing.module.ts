import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { AdminPanelComponent } from './_components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: AdminPanelComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }