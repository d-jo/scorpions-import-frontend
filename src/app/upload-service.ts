import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(url: string, files: File[]): Observable<any> {
    let formData = new FormData();
    for(let x = 0; x < files.length; x++)
      formData.append('file', files[x]);

    return this.http.post(url, formData, {
      responseType: 'text',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}