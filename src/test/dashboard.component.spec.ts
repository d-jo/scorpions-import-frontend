import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DashboardComponent } from '../app/dashboard/dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  //Mocked objects here
  let mockHttpClient = {
    get(url: string) {
      return of({
          "uploaded":   ["file1.test", "file2.pdf"],
          "review":     ["file3.test"],
          "done":       [ ],
        });
    }
  }

  let mockRouter = {
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [{provide:HttpClient, useValue: mockHttpClient}, {provide:Router, useValue:mockRouter}]
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

    expect(component.reviewFiles.length).toBe(1);
    expect(component.reviewFiles[0]).toBe("file3.test");

    expect(component.completedFiles.length).toBe(0);
    expect(component.completedFiles).toEqual([]);
  });

  //TODO add extraction test once that is implemented
});
