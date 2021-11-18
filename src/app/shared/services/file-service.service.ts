import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReport } from 'src/app/report/IReport';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private baseUrl = "http://localhost:5000";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getFile(fileId: string): Observable<IReport> {
    return this.httpClient.get<IReport>(this.baseUrl + "/view/" + fileId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }


}