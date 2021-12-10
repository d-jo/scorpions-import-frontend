import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { AppComponent } from '../app/app.component';

describe('AppComponent', () => {
  let mockAuth = {}
  let mockHttp={}
  let mockLogin = {
    logout() {return},
    isUserAuthenticated() {return of(true)},
    getUsername() {return 'user'}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide:AuthService, useValue: mockAuth}, {provide:HttpClient, useValue:mockHttp}, {provide: LoginService, useValue:mockLogin}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'scorpions-import-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('scorpions-import-frontend');
  });

  it('should get username', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.getUser()).toEqual('user');
  })
});
