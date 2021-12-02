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
    return this.httpClient.get<IReport>(this.baseUrl + "/reports/" + fileId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  public requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/dashboard/", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  public extractData(files: any): any {
    return this.httpClient.post(this.baseUrl + "/reports/extract_data", files, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  public updateReport(payload: IReport): any {
    return this.httpClient.post(this.baseUrl + "/reports/" + payload.id, payload, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

  public deleteReport(docId: string): any {
    return this.httpClient.delete(this.baseUrl + "/reports/" + docId, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

  public requestUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/users/all_users", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  public requestAdd(username: any, role: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/users/add_role", { uid: username, desired_role_id: role }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  public getUserRoles(username:string):Observable<any> {
    return this.httpClient.post(this.baseUrl+"/users/get_user_roles", {uid: username}, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  public requestRemove(username: any, role: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/users/remove_role", { uid: username, desired_role_id: role }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  
  }
  public searchFiles(searchKey:any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/reports/search", { search_key: searchKey }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }
}