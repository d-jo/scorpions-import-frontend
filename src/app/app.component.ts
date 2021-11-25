import { Component, OnDestroy } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'scorpions-import-frontend';
  showSidenav = false;

  constructor(public login: LoginService) { }

  ngOnDestroy() {
    this.login.logout();
  }

  logoutUser() {
    this.login.logout();
  }

  getUser() {
    return this.login.getUsername();
  }

  /**
   * @ngdoc method
   * @name toggleSidenav 
   * @description toggles the side navigation panel off and on
   * @returns {void}
   */
  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
    let classList = document.getElementById("router")?.classList
    let sideClassList = document.getElementById("side")?.classList
    if (!classList || !sideClassList) return

    if (this.showSidenav) {
      classList.add("active");
      sideClassList.add("active");
    } else {
      classList.remove("active");
      sideClassList.remove("active");
    }
  }
}
