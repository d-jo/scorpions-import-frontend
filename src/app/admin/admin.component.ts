import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:5000";
  edit: boolean = false;
  add: boolean = false;
  user: any;
  userSearch: any;
  roleInput: any;
  users: any[] = [];
  backup: any[] = [];
  roles:any[] = [];
  map = new Map<string, string>()

  ngOnInit(): void {
    this.map.set("instructor_role", "rol_qR3M6gdO5mSdmKsM");
    this.map.set("aac_role", "rol_IOtTwiQVxUQHbk2A");
    this.findAllUsers();
    //TODO remove this after testing
    if (!this.users || this.users.length == 0) {
      this.mockUsersAndRoles();
    }
  }

  onChange(event: any) {
    this.edit = this.add = false;
    if (event && event.target) {
      let username = event.target.value;
      if (!username || username == "") {
        this.users = this.backup
      } else {
        this.users = []
        for (let x = 0; x < this.backup.length; x++) {
          const idx = this.backup[x].toUpperCase().indexOf(username.toUpperCase())
          if (idx == 0) {
            this.users.push(this.backup[x])
          }
        }
      }
    }
  }

  findAllUsers() {
    this.requestUsers().subscribe((data: any) => {
      console.log(data)
      this.users = data.users;
      this.backup = data.users;
    })
  }

  requestUsers(): Observable<any> {
    return this.http.get(this.baseUrl + "/all_users");
  }

  mockUsersAndRoles() {
    this.backup = this.users = ["user1", "admin"];
    this.roles = ["instructor_role"];
  }

  removeRole(role: any) {
    if (confirm("Are you sure you want to remove " + role + " from " + this.user + "?")) {
      let roleId = this.map.get(role);
      if (!roleId) return
      this.requestRemove(this.user, roleId).subscribe((data:any) => {
        console.log(data)
      })
    }
  }

  requestRemove(username: any, role: any): Observable<any> {
    return this.http.post(this.baseUrl + "/remove_role", { uid: username, desired_role_id: role });
  }

  addRole() {
    if(this.roles.some(v => v === this.roleInput)) {
      alert(this.user+ " already has the role " + this.roleInput);
      return; 
    }
    let roleId = this.map.get(this.roleInput);
    if (!roleId) return
    this.requestAdd(this.user, roleId).subscribe((data:any) => {
      console.log(data)
    })
    this.roleInput = ""
  }

  requestAdd(username: any, role: any): Observable<any> {
    return this.http.post(this.baseUrl + "/add_role", { uid: username, desired_role_id: role });
  }

  editUser(user: any) {
    this.user = user;
    this.edit = true;
    this.getUserRoles(this.user).subscribe((data:any) => {
      this.roles = data.roles;
    });
  }

  getUserRoles(username:string):Observable<any> {
    return this.http.post(this.baseUrl+"/get_user_roles", {uid:username});
  }

}
