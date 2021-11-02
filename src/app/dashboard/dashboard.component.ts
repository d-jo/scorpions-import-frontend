import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardFiles } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  uploadFiles: any; 
  reviewFiles: any;
  completedFiles: any;
  baseUrl = "http://localhost:5000";

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.requestFiles().subscribe((data: DashboardFiles) => {
      this.uploadFiles = data.uploaded;
      this.reviewFiles = data.review;
      console.log(this.reviewFiles)
      this.completedFiles = data.done;
    })
  }

  requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/dashboard");
  }

  getFileText(file:any) {
    return file && file.length > 0 ? file : "";
  }

  callExtract() {
    this.extractFiles().subscribe(() => {
      console.log("Extraction Finished!");
    });
  }

  extractFiles(): any {
    return this.httpClient.get(this.baseUrl + "/reports/trigger_process");
  }

  reviewFile(file: any) {
    console.log("Review: " + file);
  }
}
