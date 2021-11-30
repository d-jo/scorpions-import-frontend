import { Component, OnInit } from '@angular/core';
import { FileServiceService } from '../shared/services/file-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: FileServiceService) { }

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
    this.service.requestUsers().subscribe((data: any) => {
      console.log(data)
      this.users = data.users;
      this.backup = data.users;
    })
  }

  mockUsersAndRoles() {
    this.backup = this.users = ["user1", "admin"];
    this.roles = ["instructor_role"];
  }

  removeRole(role: any) {
    let c = confirm("Are you sure you want to remove " + role.name + " from " + this.user.name + "?");
    console.log(c);
    if (c) {
      let roleId = role.id;//this.map.get(role.id);
      console.log(roleId);
      if (!roleId) return
      console.log(roleId);
      this.service.requestRemove(this.user.user_id, roleId).subscribe((data:any) => {
        console.log(data)
      })
    }
  }

  addRole() {
    if(this.roles.some(v => v === this.roleInput)) {
      alert(this.user+ " already has the role " + this.roleInput);
      return; 
    }
    let roleId = this.map.get(this.roleInput);
    if (!roleId) return
    this.service.requestAdd(this.user.user_id, roleId).subscribe((data:any) => {
      console.log(data)
    })
    this.roleInput = ""
  }


  editUser(user: any) {
    this.user = user;
    this.edit = true;
    this.service.getUserRoles(this.user.user_id).subscribe((data:any) => {
      console.log(data)
      this.roles = data.user_roles;
    });
  }

}
