import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { DashboardComponent } from '../app/dashboard/dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  //Mocked objects here
  let mockHttpClient = {
    get(url: string) {
      return of({ files: ["file1.test", "file2.pdf"]});
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [{provide:HttpClient, useValue: mockHttpClient}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve files on load', () => {
    expect(component.uploadFiles.length).toBe(2);
    expect(component.uploadFiles[0]).toBe("file1.test");
  });

  //TODO add extraction test once that is implemented
});
