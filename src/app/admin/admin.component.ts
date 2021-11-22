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

  users: any[] = [];
  edit: boolean = false;
  user: any;
  add: boolean = false;
  userSearch: any;
  roleInput: any;
  baseUrl = "http://localhost:5000";
  backup: any[] = [];
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
          const idx = this.backup[x].username.toUpperCase().indexOf(username.toUpperCase())
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
      this.users = data;
      this.backup = data;
    })
  }

  requestUsers(): Observable<any> {
    return this.http.get(this.baseUrl + "/all_users");
  }

  mockUsersAndRoles() {
    let user1 = {
      username: "user1",
      roles: []
    };
    let user2 = {
      username: "admin",
      roles: ["instructor_role", "aac_role"]
    }
    this.users = [user1, user2];
    this.backup = [user1, user2];
  }

  removeRole(username: any, role: any) {
    if (confirm("Are you sure you want to remove " + role + " from " + username + "?")) {
      let roleId = this.map.get(role);
      if (!roleId) return
      this.requestRemove(username, roleId).subscribe((data:any) => {
        console.log(data)
      })
    }
  }

  requestRemove(username: any, role: any): Observable<any> {
    return this.http.post(this.baseUrl + "/remove_role", { uid: username, desired_role_id: role });
  }

  addRole() {
    let roleId = this.map.get(this.roleInput);
    if (!roleId) return
    console.log(roleId)
    this.requestAdd(this.user?.username, roleId).subscribe((data:any) => {
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
  }

}
