import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.checkSignedIn();
  }

  loginUser() {
    this.login.loginWithPopup();
  }

  /**
   * @ngdoc method
   * @name checkSignedIn 
   * @description checks if the user is signed in, and routes them to the dashboard if they are
   * @returns {void}
   */
  checkSignedIn() {
    this.login.isUserAuthenticated().subscribe((data:boolean) => {
      if(data) {
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
