import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: 'import', component: ImportComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate:[UserService] },
  { path: '', redirectTo: '/import', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
