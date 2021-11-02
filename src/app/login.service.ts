import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }

  username:string | undefined;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.isAuthenticated$;
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' }).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  getUsername() {
    return localStorage.getItem('user');
  }

  loginWithPopup() {
    this.auth.loginWithPopup({ screen_hint: 'signup' }).subscribe(() => {
      this.auth.getAccessTokenSilently().subscribe((details:any) => {
        if(details) {
          localStorage.setItem('token', details);
          this.router.navigate(['/dashboard']);
          this.auth.user$.subscribe((data:any) => {
            localStorage.setItem('user', data.name);
          })
        }
      })
    });
  }

  isUserAuthenticated() {
    return this.auth.isAuthenticated$;
  }

  logout(): void {
    this.auth.logout({ returnTo: window.location.origin });
  }
}
