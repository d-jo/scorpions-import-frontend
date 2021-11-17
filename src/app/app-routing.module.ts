import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';



const routes: Routes = [
  { path: 'import', component: ImportComponent, canActivate:[LoginService] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[LoginService] },
  { path: 'review/:id', component: ReviewComponent, canActivate:[LoginService] },
  { path: 'admin', component: AdminComponent, canActivate:[LoginService] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
