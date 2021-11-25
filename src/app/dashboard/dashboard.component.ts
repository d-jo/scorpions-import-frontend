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
    return this.service.requestFiles();
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

  /**
   * @ngdoc method
   * @name extractData 
   * @description makes the http request to extract the data from the files
   * @returns {any} the backend http response
   */
  extractData(): any {
    return this.service.extractData(this.files);
  }

  /**
   * @ngdoc method
   * @name reviewFile 
   * @description TODO
   * @param {any} file the specified file to review
   * @returns {void}
   */
  reviewFile(file: any) {
    this.route.navigate(['/review', file[0]]);
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
