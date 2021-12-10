import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }

  username:string | undefined;
  
   /**
   * @ngdoc method
   * @name canActivate
   * @description this is used to verify url routes with current user. 
   *  If a user is not authorized, they will not be allowed to go to the url and will be redirected to login 
   * @param {ActivatedRouteSnapshot=} route not used
   * @param {RouterStateSnapshot=} state not used
   * @returns {Observable} of the response from auth0 if the user is authenticated
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let token = localStorage.getItem("token")
    if(token && token != " " && token.split(".").length == 3) {
      return true;
    }
    return this.auth.isAuthenticated$.pipe(map((data:boolean) => {
      if(!data) {
        this.router.navigate(['/login'])
      }
      return data;
    }));
  }

   /**
   * @ngdoc method
   * @name loginWithRedirect
   * @description redirects user to auth0 page to sign in, not used currently 
   * @returns {void} 
   */
  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' }).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  /**
   * @ngdoc method
   * @name getUsername 
   * @description returns the username of the logged in user 
   * @returns {*} string of the user or void if none 
   */
  getUsername() :string {
    let str = localStorage.getItem('user');
    return str ? str : "";
  }

  /**
   * @ngdoc method
   * @name loginWithPopup
   * @description brings up a separate window for the user to sign in, this will preserve the page state
   * @returns {void} 
   */
  loginWithPopup() {
    this.auth.loginWithPopup({ screen_hint: 'signup' }).subscribe(() => {
      this.auth.getAccessTokenSilently().subscribe((details:any) => {
        if(details) {
          localStorage.setItem('token', details);
          this.router.navigate(['/dashboard']);
          this.auth.user$.subscribe((data:any) => {
            console.log(data)
            localStorage.setItem('user', data.name);
            localStorage.setItem('user_id', data.user_id);
          })
        }
      })
    });
  }

  /**
   * @ngdoc method
   * @name isUserAuthenticated 
   * @description makes an auth0 request to verify if user is authenticated
   * @returns {Observable<Boolean>} 
   */
  isUserAuthenticated() {
    return this.auth.isAuthenticated$;
  }

  /**
   * @ngdoc method
   * @name logout 
   * @description logs out the current user
   * @returns {*}
   */
  logout(): void {
    localStorage.setItem('token', "");
    this.auth.logout({ returnTo: window.location.origin });
  }
}
