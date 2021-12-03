import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'scorpions-import-frontend';
  currentSelection = 'home';
  
  constructor(public login: LoginService, private router: Router) { }

  ngOnInit() {
    this.selectNav(this.currentSelection);
  }

  ngOnDestroy() {
    this.login.logout();
  }

  logoutUser() {
    this.login.logout();
  }

  getUser() {
    return this.login.getUsername();
  }

  selectNav(nav:string) {
    console.log(nav);
    if(this.currentSelection && this.currentSelection != nav) {
      var previous = document.getElementById(this.currentSelection);
      previous?.classList.remove("selected");
    }
    var target = document.getElementById(nav);
    target?.classList.add("selected");
    this.currentSelection = nav; 
  }
}
