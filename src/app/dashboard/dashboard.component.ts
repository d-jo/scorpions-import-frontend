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
    this.reviewFiles = ["file3.txt", "file4.docx"];
    this.completedFiles = ["file5.txt", "file6.docx"];
  }

  getFiles(): void {
    this.requestFiles().subscribe((data: any) => {
      console.log(data);
      this.uploadFiles = data.files;
    })
  }

  requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/dashboard");
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
