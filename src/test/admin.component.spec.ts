import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AdminComponent } from '../app/admin/admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    let mockHttp = { 
      get() {return of({users:["user1"]})}
    }

    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      providers: [{provide:HttpClient, useValue:mockHttp}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set users and save backup', () => {
    component.findAllUsers()
    expect(component.backup).toEqual(["user1"])
  })
});
