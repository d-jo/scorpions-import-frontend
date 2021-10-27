import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportComponent } from './import/import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from './upload-service';
import { HttpClientModule } from '@angular/common/http';
import { DragdropDirective } from './dragdrop.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    DragdropDirective,
    DashboardComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [UploadService],
  bootstrap: [AppComponent],
})
export class AppModule { }
