import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload-service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private upload: UploadService) {}

  baseUrl = "http://localhost:5000";
  fileName:string | undefined;
  files = [] as any;

  ngOnInit(): void {}

  selectFile(event: any) {
    if(!event || !event.target) return;
    this.onFileDrop(event.target.files);
  }

  onFileDrop(event: FileList) {
    if(event.length > 0) {
      for(let x = 0; x < event.length; x++) {
        if(this.validFile(event[x].name))
          this.files.push(event[x]);
        else 
          alert("File extensions can only be .pdf or .docx!");
      }
      console.log(this.files.length);
    }
  }

  validFile(name: String) {
    let ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
    console.log("file extension: " + ext);
    return ext == 'txt' || ext == 'pdf' || ext == 'docx'
}

  uploadFiles() {
    if (this.files.length == 0) {
      console.log("No file selected!");
      return
    }

    this.upload.uploadFile(this.baseUrl, this.files)
      .subscribe(data => {
        console.log(data);
      },
        // (event: Event) => {
        //   if (event.type == HttpEventType.UploadProgress) {
        //     const percentDone = Math.round(100 * event.loaded / event.total);
        //     console.log(`File is ${percentDone}% loaded.`);
        //   } else if (event instanceof HttpResponse) {
        //     console.log('File is completely loaded!');
        //   }
        // },
        (err: Error) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
  }

  formatBytes(size:number) {
    var i = 0;
    var byteUnits = [' B', ' KB', ' MB'];
    while(size > 1024 && i < 2) {
        size = size / 1024;
        i++;
    };
    return Math.max(size, 0.1).toFixed(2) + byteUnits[i];
};

}
