import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportComponent } from './import/import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UploadService } from './shared/services/upload-service';
import { HttpClientModule } from '@angular/common/http';
import { DragdropDirective } from './shared/services/dragdrop.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { environment as env } from '../environments/environment';
import { LoginService } from './shared/services/login.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    DragdropDirective,
    DashboardComponent,
    LoginComponent,
    AdminComponent,
    ReviewComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [UploadService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }
