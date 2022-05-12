import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: UserModel;
  users: any;
  constructor(
    private userRest: UserRestService,
  ) {
    this.user = new UserModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userRest.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.users
      },
      error: (err) => alert(err.error.message || err.error)
    })
  }

  saveUser(userForm:any){
    this.userRest.saveUser(this.user).subscribe({
      next: (response:any)=>{
        alert(response.message);
    },
    error:(err)=>{
      userForm.reset();
      return alert(err.error.message || err.error)
    }

    })
  }

  deleteUser(id:string){
    this.userRest.deleteUser(id).subscribe({
      next: (res:any) => {
        this.users = res.users
      },
      error: (err) => alert(err.error.message || err.error)
    })
  }



}

