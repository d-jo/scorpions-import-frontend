import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getFiles();
    this.reviewFiles = ["file3.txt", "file4.docx"];
    this.completedFiles = ["file5.txt", "file6.docx"];
  }

  getFiles(): void {
    this.requestFiles().subscribe((data: any) => {
      this.uploadFiles = data.files;
    })
  }

  requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/files");
  }

  extractFiles(): void {

  }
  routeToUpload() {
    this.router.navigate(['/import']);
  }
}
