import { Component } from '@angular/core';
//import { AuthService } from './auth.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scorpions-import-frontend';
  showSidenav = false;
  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    let classList = document.getElementById("router")?.classList
    let sideClassList = document.getElementById("side")?.classList
    if(!classList || !sideClassList) return

    if(this.showSidenav) {
      classList.add("active");
      sideClassList.add("active");
    } else {
      classList.remove("active");
      sideClassList.remove("active");
    }
  }
  constructor(public auth: AuthService) { }
  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: window.location.origin });
  }
}
