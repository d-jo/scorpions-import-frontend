import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/shared/services/upload-service';

import { ImportComponent } from '../app/import/import.component';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;
  //Mock objects here
  let mockRouter = {
    navigate(path:any) {
      return;
    }
  }
  let mockUploadService = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportComponent ],
      providers:  [{provide:UploadService, useValue:mockUploadService}, 
        {provide:Router, useValue:mockRouter}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate file extensions', ()=>{
    //Only .pdf and .docx are allowed
    expect(component.validFile("test.pdf")).toBeTrue();
    expect(component.validFile("test.docx")).toBeTrue();
    expect(component.validFile("test.xlsx")).toBeFalse();
    expect(component.validFile("test.jpg")).toBeFalse();
  })

  it('should calculate byte size', () => {
    expect(component.formatBytes(1023)).toBe("1023.00 B");
    expect(component.formatBytes(1025)).toBe("1.00 KB");
    expect(component.formatBytes(1025*1025)).toBe("1.00 MB");
  });

  it('should remove files', () => {
    component.files = ["file1", "file2", "file3", 
    "file4", "file5", "file6", "file7"];

    component.removeFile("file1");
    component.removeFile("file4");
    component.removeFile("file7");
    let removedFiles = true;
    for(let x = 0; x < component.files.length; x++) {
      let fileStr = component.files[x]; 
      if(fileStr == "file1" || fileStr == "file4" || fileStr == "file7") {
        removedFiles = false;
        break;
      }
    }
    expect(removedFiles).toBeTrue();
  });
});
