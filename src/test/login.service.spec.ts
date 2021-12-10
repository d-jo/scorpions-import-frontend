import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { LoginService } from '../app/shared/services/login.service';

describe('LoginService', () => {
  let service: LoginService;
  let mockAuth = {}
  let mockRouter = {}


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide:AuthService, useValue: mockAuth}, {provide:Router, useValue:mockRouter} ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
