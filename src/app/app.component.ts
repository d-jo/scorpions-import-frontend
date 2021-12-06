import { Component, OnDestroy } from '@angular/core';
import { FileServiceService } from './shared/services/file-service.service';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'scorpions-import-frontend';
  currentSelection = 'home';
  showAdmin = false;
  
  constructor(public login: LoginService, private service: FileServiceService) { }

  ngOnInit() {
    //TODO dont show admin link if user is not admin
    // this.service.getUserRoles(this.getUser()).subscribe((data:any) => {
    //   console.log(data)
    //   pseudo code - also put *ngIf="showAdmin" in the html
    //   this.showAdmin = adminRole in data.user_roles;
    // });
    this.selectNav(this.currentSelection);
  }

  ngOnDestroy() {
    this.login.logout();
  }

  logoutUser() {
    this.login.logout();
  }

  getUser() :string {
    return this.login.getUsername();
  }

  selectNav(nav:string) {
    if(this.currentSelection && this.currentSelection != nav) {
      var previous = document.getElementById(this.currentSelection);
      previous?.classList.remove("selected");
    }
    var target = document.getElementById(nav);
    target?.classList.add("selected");
    this.currentSelection = nav; 
  }
}
