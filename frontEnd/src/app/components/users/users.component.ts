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
  role: any[] = [
    { role: 'ADMIN', name: 'Administrador' },
    { role: 'CLIENT', name: 'Cliente' }
  ]
  userUpdate: any;


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

  saveUser(userForm: any) {
    this.userRest.saveUser(this.user).subscribe({
      next: (response: any) => {
        alert(response.message);
        userForm.reset();
        this.getUsers();
      },
      error: (err) => {
        userForm.reset();
        return alert(err.error.message || err.error)
      }

    })
  }

  getUser(id: string) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => this.userUpdate = res.user,
      error: (err) => alert(err.error.message)
    })
  }

  updateUs() {
    this.userUpdate.password = undefined;
    this.userRest.updateUser(this.userUpdate._id, this.userUpdate).subscribe({
      next: (res: any) => {
        alert(res.message)
        this.getUsers();
      },
      error: (err) => alert(err.error.message)
    })
  }

  deleteUser(id:string){
  this.userRest.deleteUser(id).subscribe({
    next: (res:any)=>{
      alert(res.message);
      this.getUsers();
    },
    error: (err) => alert(err.error.message)
  })
  }

}

