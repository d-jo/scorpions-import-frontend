import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../shared/services/upload-service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  
  constructor(private upload: UploadService, private router: Router) { }

  baseUrl = "http://localhost:5000";
  fileName: string | undefined;
  files = [] as any;

  ngOnInit(): void {}

  /**
   * @ngdoc method
   * @name selectFile 
   * @description listens for a change event in the input area and passes event to onFileDrop
   * @param {any} event the event to pass to add selected files to list
   * @returns {void}
   */
  selectFile(event: any) {
    if (!event || !event.target) return;
    this.onFileDrop(event.target.files);
  }

  /**
   * @ngdoc method
   * @name onFileDrop 
   * @description adds files to the list to be imported and checks their extensions
   * @param {FileList} event the event with the file list to be added for import
   * @returns {void}
   */
  onFileDrop(event: FileList) {
    if (event.length > 0) {
      for (let x = 0; x < event.length; x++) {
        if (this.validFile(event[x].name))
          this.files.push(event[x]);
        else
          alert("File extensions can only be .pdf or .docx!");
      }
    }
  }

  /**
   * @ngdoc method
   * @name validFile 
   * @description checks the given filename to see if the extension is pdf or docx
   * @param {string} name the filename passes
   * @returns {boolean} if the file is .pdf or .docx returns true, false otherwise
   */
  validFile(name: String):boolean {
    let ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
    return ext == 'pdf' || ext == 'docx'
  }

  /**
   * @ngdoc method
   * @name uploadFiles 
   * @description uploads the files to the backend to be saved for processing
   * @returns {void}
   */
  uploadFiles() {
    if (this.files.length == 0) {
      alert("No file selected for upload!");
      return
    }

    this.upload.uploadFile(this.baseUrl + '/files/', this.files)
    .subscribe(
        () => {
          console.info("Upload done");
          this.router.navigate(['/dashboard']);
        },
        (err: Error) => {
          console.error("Upload Error:", err);
        }
      )
  }

  /**
   * @ngdoc method
   * @name formatBytes 
   * @description formats the size of the file to display to the user in B, KB, or MB
   * @param {number} size the file size
   * @returns {string} string of formatted bytes
   */
  formatBytes(size: number) {
    var i = 0;
    var byteUnits = [' B', ' KB', ' MB'];
    while (size > 1024 && i < 2) {
      size = size / 1024;
      i++;
    };
    return Math.max(size, 0.1).toFixed(2) + byteUnits[i];
  };

  /**
   * @ngdoc method
   * @name removeFile 
   * @description removes the specified file from the file list
   * @param {any} file file to be removed
   * @returns {void}
   */
  removeFile(file: any) {
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}
