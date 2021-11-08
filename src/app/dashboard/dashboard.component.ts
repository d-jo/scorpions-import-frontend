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
  files: string[] = []
  display = false
  slos:any[] = []
  reports:any[] = []

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.get(this.baseUrl + "/dashboard");
  }

  getFileText(file: any) {
    return file && file.length > 0 ? file : "";
  }

  callExtract() {
    // this.extractFiles().subscribe(() => {
    //   console.log("Extraction Finished!");
    // });
    this.extractData().subscribe((data:any) => {
      // console.log(data);
      for(let i = 0; i < data.reports.length; i++) {
        let item = data.reports[i]
        console.log(item)
        for(let j = 0; j < item.length; j++) {
          if(item[j] instanceof Array && item[j].length == 0) {
            console.log("HERE")
            continue
          }
          this.reports.push(item[j])
        }
      }
      for(let i = 0; i < data.slos.length; i++) {
        let item = data.slos[i]
        console.log(item)
        for(let j = 0; j < item.length; j++) {
          this.slos.push(item[j])
        }
      }
      console.log(this.reports)
      console.log(this.slos)
      this.display = true
    });
  }

  extractFiles(): any {
    return this.httpClient.get(this.baseUrl + "/reports/trigger_process");
  }

  extractData(): any {
    return this.httpClient.post(this.baseUrl + "/reports/extract_data", this.files, {responseType: 'json'});
  }

  reviewFile(file: any) {
    console.log("Review: " + file);
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
