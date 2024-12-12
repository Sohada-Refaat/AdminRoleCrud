import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './components/roles/roles.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';


const appRoutes: Routes = [
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'admins',
    component: AdminsComponent
  }];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterOutlet,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
