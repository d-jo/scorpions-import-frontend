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
 * @ngdoc method
 * @name getFile 
 * @description Get a <code>IReport</code> Observable object from the database.
 * @param {string} fileId - File id to get from API.
 * @returns {IReport} of file data
 */
  public getFile(fileId: string): Observable<IReport> {
    return this.httpClient.get<IReport>(this.baseUrl + "/reports/" + fileId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name requestFiles 
   * @description Get a list of files in that statuses of 'Upload', 'Review' and 'Done'
   * to display on the dashboard.
   * @returns {amy} JSON response of done[], review[], uploaded[].
   */
  public requestFiles(): any {
    return this.httpClient.get(this.baseUrl + "/dashboard/", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name extractData 
   * @description Trigger report parsing and persisting to the database via the API.
   * @param {any} files - files selected from the dashboard to be processed by the backend.
   * @returns {any} a JSON response containing some of the data pulled from the file.
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
   * @ngdoc method
   * @name updateReport 
   * @description Sends a <code>IReport</code> payload to the backend to update the report in the database.
   * @param {IReport} payload - <code>IRport</code> JSON payload
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
   * @ngdoc method
   * @name deleteReport 
   * @description Send a file document id to the backend to mark the file as deleted so it will
   * no longer be returned from all queries to the database.
   * @param {string} docId - File document id to delete.
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
   * @ngdoc method
   * @name requestUsers 
   * @description Get all users registered in Auth0. User must have proper AAC role to access this endpoint.
   * @returns {Observable<any>} JSON list of users and their details.
   */
  public requestUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/users/all_users", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name requestAdd 
   * @description Append roles to a user.
   * @param {any} userId      - User's id 
   * @param {any} role        - Role to append to the user.
   * @returns {null}
   */
  public requestAdd(userId: any, role: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/users/add_role", { uid: userId, desired_role_id: role }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name getUserRoles 
   * @description Get a JSON list of the user's roles.
   * @param {string} userId - JSON object containing the user's username
   * @returns {Observable<any>} JSON list of the user's roles.
   */
  public getUserRoles(userId:string):Observable<any> {
    return this.httpClient.post(this.baseUrl+"/users/get_user_roles", {uid: userId}, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

   /**
   * @ngdoc method
   * @name getCurrentUserInfo 
   * @description Get the current logged in user's information.
   * @returns {Observable<any>} JSON list of the current user's info.
   */
    public getCurrentUserInfo():Observable<any> {
      return this.httpClient.get(this.baseUrl+"/users/me", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
    }

  /**
   * @ngdoc method
   * @name getFileAuditHistory 
   * @description Get the audit log history for a single file.
   * @param {string} fileId - file id.
   * @returns {Observable<any>} JSON list of the audit trail for the file's lifecycle.
   */
  public getFileAuditHistory(fileId:string):Observable<any> {
    return this.httpClient.get(this.baseUrl+"/audit/file/" + fileId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

  /**
   * @ngdoc method
   * @name getUserAuditHistory 
   * @description Get a user's actions thorughout the application.
   * @param {string} username - User's name { name: username }
   * @returns {Observable<any>} JSON list of the all the user's entries in the audit log across files.
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
   * @ngdoc method
   * @name requestRemove 
   * @description Remove a role from a user.
   * @param {any} userId      - User to remove role from.
   * @param {any} role        - Role id to be removed from the user.
   * @returns {Observable<any>}
   */
  public requestRemove(userId: any, role: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/users/remove_role", { uid: userId, desired_role_id: role }, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  
  }

  /**
   * @ngdoc method
   * @name searchFiles 
   * @description Search files from the database by either the title, college, department, 
   * degree_level, academic year or date range
   * 
   * @param {any} searchKey - Key word to search by.
   * @returns {Observable<any>} JSON list of files that match the search in one of the columns listed above, 
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

  /**
   * 
   * @param {any} pl The payload for deleting 
   * @param fileId The file id the payload is related to
   * @returns  {Observable<any>} JSON object of the response
   */
  public postDeletePayload(pl: any, fileId: string): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/reports/manage/" + fileId, pl, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }
}