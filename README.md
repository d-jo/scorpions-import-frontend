# ScorpionsImportFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Release Notes

1.0.0 - For this release, we have a working Dashboard page with some mock data for Review and Done sections. For The upload section, a user is able to import a .docx, .pdf, or .txt(for testing) file to the backend and then extract data from them. 

1.1.0 - For this release, we have added user authentication with Auth0, basic extraction endpoints and cleaned up the overall look of the web application. Docx files are able to be uploaded and then data is extracted from them and displayed to the page.

1.3.0 - For this release, we have built out the review/edit page for reports, this page will allow the user to review what was parsed from the processed file and edit the data as needed. We have also built out the initial admin page to manage users and their roles.