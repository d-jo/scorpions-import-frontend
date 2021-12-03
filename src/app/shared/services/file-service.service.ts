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

/**
 * Get a <code>IReport</code> Observable object from the database.
 * 
 * @param fileId - File id to get from API.
 * @returns IReport of file data
 */
  public getFile(fileId: string): Observable<IReport> {
    return this.httpClient.get<IReport>(this.baseUrl + "/reports/" + fileId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Get a list of files in that statuses of 'Upload', 'Review' and 'Done'
   * to display on the dashboard.
   * 
   * @returns JSON response of done[], review[], uploaded[].
   */
  public requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/dashboard/", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Trigger report parsing and persisting to the database via the API.
   * 
   * @param files - files selected from the dashboard to be processed by the backend.
   * @returns a JSON response containing some of the data pulled from the file.
   */
  public extractData(files: any): any {
    return this.httpClient.post(this.baseUrl + "/reports/extract_data", files, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Sends a <code>IReport</code> payload to the backend to update the report in the database.
   * 
   * @param payload - <code>IRport</code> JSON payload
   * @returns {"message":"report updated","status":"success | faliure"}
   */
  public updateReport(payload: IReport): any {
    return this.httpClient.post(this.baseUrl + "/reports/" + payload.id, payload, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

  /**
   * Send a file document id to the backend to mark the file as deleted so it will
   * no longer be returned from all queries to the database.
   * 
   * @param docId - File document id to delete.
   * @returns {"message":"report updated","status":"success | falure"}
   */
  public deleteReport(docId: string): any {
    return this.httpClient.delete(this.baseUrl + "/reports/" + docId, {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

  /**
   * Get all users registered in Auth0. User must have proper AAC role to access this endpoint.
   * 
   * @returns JSON list of users and their details.
   */
  public requestUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/users/all_users", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Append roles to a user.
   * 
   * @param username    - User's uid username 
   * @param role        - Role to append to the user.
   * @returns null
   */
  public requestAdd(username: any, role: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/users/add_role", { uid: username, desired_role_id: role }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Get a JSON list of the user's roles.
   * 
   * @param username - JSON object containing the user's username
   * @returns JSON list of the user's roles.
   */
  public getUserRoles(username:string):Observable<any> {
    return this.httpClient.post(this.baseUrl+"/users/get_user_roles", {uid: username}, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Get the audit log history for a single file.
   * 
   * @param fileId - file id.
   * @returns JSON list of the audit trail for the file's lifecycle.
   */
  public getFileAuditHistory(fileId:string):Observable<any> {
    return this.httpClient.get(this.baseUrl+"/audit/file/" + fileId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Get a user's actions thorughout the application.
   * 
   * @param username - User's name { name: username }
   * @returns JSON list of the all the user's entries in the audit log across files.
   */
  public getUserAuditHistory(username:string):Observable<any> {
    return this.httpClient.post(this.baseUrl+"/audit/user", {name: username}, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * Remove a role from a user.
   * 
   * @param username    - User to remove role from.
   * @param role        - Role id to be removed from the user.
   * @returns 
   */
  public requestRemove(username: any, role: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/users/remove_role", { uid: username, desired_role_id: role }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  
  }

  /**
   * Search files from the database by either the title, college, department, 
   * degree_level, academic year or date range
   * 
   * @param searchKey - Key word to search by.
   * @returns JSON list of files that match the search in one of the columns listed above, 
   * returned in the same format as <code>/dashboard</code>
   */
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