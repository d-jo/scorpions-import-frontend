import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: 'import', component: ImportComponent },
  { path: 'dashboard', component: DashboardComponent }, //TODO Authorization canActivate: [UserService]
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
