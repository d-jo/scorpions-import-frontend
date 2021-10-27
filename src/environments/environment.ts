// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//import { domain, clientId } from '../../auth_config.json';


export const environment = {
  production: false,
  auth: {
    "domain": "dev-z-nqa8s0.us.auth0.com",
    "clientId": "U6VWgTMPUMfM8SaQuAhjIxKuYyopDB31",
    "audience":"https://dev-z-nqa8s0.us.auth0.com/api/v2/",
    auth0RedirectUri: 'http://localhost:4200', // URL to return to after auth0 login
    auth0ReturnTo: 'http://localhost:4200', // URL to return to after auth0 logout
    scope: 'openid profile',
    redirectUri: window.location.origin,
    callbackURL: 'http://localhost:4200',

  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
