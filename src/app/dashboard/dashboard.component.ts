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
  searchKey: string = "";
  display = false
  reports:any[] = []
  slos:any[] = []
  measures:any[] = []
  analysis:any[] = []
  decisions:any[] = []
  checkBoxStates:boolean[] = []

  constructor(private route: Router,
            private service: FileServiceService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  /**
   * @ngdoc method
   * @name getFiles 
   * @description requests the files and their states from the backend
   */
  getFiles(): void {
    this.requestFiles().subscribe((data: DashboardFiles) => {
      this.uploadFiles = data.uploaded;
      for(let x = 0; x < this.uploadFiles.length; x++) {
        this.checkBoxStates.push(false)
      }
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
      for(let i = 0; i < data.measures.length; i++) {
        let item = data.measures[i]
        for(let j = 0; j < item.length; j++) {
          this.measures.push(item[j])
        }
      }
      for(let i = 0; i < data.analysis.length; i++) {
        let item = data.analysis[i]
        for(let j = 0; j < item.length; j++) {
          this.analysis.push(item[j])
        }
      }
      for(let i = 0; i < data.decisions.length; i++) {
        let item = data.decisions[i]
        for(let j = 0; j < item.length; j++) {
          this.decisions.push(item[j])
        }
      }
      this.clearCheckBoxStates()
      this.display = true;
      this.getFiles();
    });
  }
  
  clearCheckBoxStates() {
    for(let x = 0; x < this.checkBoxStates.length; x++) {
      this.checkBoxStates[x] = false
    }
    this.files = []
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
   * @description navigate to review page with the file id to grab info from
   * @param {any} file the specified file to review
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
   */
  addFile(checked: boolean, file: string, idx: number) {
    this.checkBoxStates[idx] = checked
    if (checked) {
      this.files.push(file)
    } else {
      const index = this.files.indexOf(file, 0);
      if (index > -1) {
        this.files.splice(index, 1);
      }
    }
  }

  /**
   * @ngdoc method
   * @name callSearch
   * @description calls the backend to search for files based on input and displays the returned data
   */
  callSearch() {
    if(this.searchKey == "") return
    this.searchFile().subscribe((data: DashboardFiles) => {
      this.uploadFiles = data.uploaded;
      this.reviewFiles = data.review;
      this.completedFiles = data.done;
    })
  }

  /**
   * @ngdoc method
   * @name searchFile
   * @description uses fileService to invoke the backend call
   * @returns {Observable} search file return response
   */
  searchFile():any {
    return this.service.searchFiles(this.searchKey);
  }

  clear() {
    this.searchKey = ""
    this.getFiles()
  }
}
