import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DashboardFiles } from './dashboard.model';
import { Router } from '@angular/router';
import { FileServiceService } from '../shared/services/file-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()
  fileId: string | undefined;
  
  uploadFiles: any;
  reviewFiles: any;
  completedFiles: any;
  files: string[] = []
  display = false
  slos:any[] = []
  reports:any[] = []

  constructor(private route: Router,
            private service: FileServiceService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.requestFiles().subscribe((data: DashboardFiles) => {
      this.uploadFiles = data.uploaded;
      this.reviewFiles = data.review;
      this.completedFiles = data.done;
    })
  }

  requestFiles(): any {
    return this.service.requestFiles();
  }

  getFileText(file: any) {
    return file && file.length > 0 ? file : "";
  }

  callExtract() {
    this.extractData().subscribe((data:any) => {
      for(let i = 0; i < data.reports.length; i++) {
        let item = data.reports[i]
        for(let j = 0; j < item.length; j++) {
          if(item[j] instanceof Array && item[j].length == 0) {
            continue
          }
          this.reports.push(item[j])
        }
      }
      for(let i = 0; i < data.slos.length; i++) {
        let item = data.slos[i]
        for(let j = 0; j < item.length; j++) {
          this.slos.push(item[j])
        }
      }
      this.display = true
    });
  }

  extractData(): any {
    return this.service.extractData(this.files);
  }

  reviewFile(file: any) {
    this.route.navigate(['/review', file[0]]);
  }

  addFile(checked: boolean, file: string) {
    if (checked) {
      this.files.push(file)
    } else {
      const index = this.files.indexOf(file, 0);
      if (index > -1) {
        this.files.splice(index, 1);
      }
    }
  }
}
