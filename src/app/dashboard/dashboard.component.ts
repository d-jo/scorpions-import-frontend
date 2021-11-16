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

  /**
   * @ngdoc method
   * @name getFiles 
   * @description requests the files and their states from the backend
   * @returns {void}
   */
  getFiles(): void {
    this.requestFiles().subscribe((data: DashboardFiles) => {
      this.uploadFiles = data.uploaded;
      this.reviewFiles = data.review;
      this.completedFiles = data.done;
    })
  }

  /**
   * @ngdoc method
   * @name requestFiles 
   * @description makes the http call to the backend
   * @returns {any} the backend response
   */
  requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/dashboard/", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name getFileText 
   * @description gets the file name to be displayed to the user
   * @param {any} file the given file to get its name
   * @returns {string} file name string
   */
  getFileText(file: any) {
    return file && file.length > 0 ? file : "";
  }

  /**
   * @ngdoc method
   * @name callExtract
   * @description calls the backend to extract the selected files and displays the returned data
   * @returns {void}
   */
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

  // extractFiles(): any {
  //   return this.httpClient.get(this.baseUrl + "/reports/trigger_process");
  // }

  /**
   * @ngdoc method
   * @name extractData 
   * @description makes the http request to extract the data from the files
   * @returns {any} the backend http response
   */
  extractData(): any {
    return this.httpClient.post(this.baseUrl + "/reports/extract_data", this.files, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name reviewFile 
   * @description TODO
   * @param {any} file the specified file to review
   * @returns {void}
   */
  reviewFile(file: any) {
    console.log("Review: " + file);
  }

  /**
   * @ngdoc method
   * @name addFile 
   * @description adds/removes a file to/from the file list for data extraction 
   * @param {boolean} checked if the box is checked or not, tells if it is an add or remove
   * @param {string} file the file name to add/remove from the list
   * @returns {void}
   */
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
