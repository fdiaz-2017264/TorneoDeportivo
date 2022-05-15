import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

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
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: 'Usuario',
          icon: 'success',
          text: res.message,
          showConfirmButton: false,
          timer: 1000
        })
        userForm.reset();
        this.getUsers();
      },
      error: (err) => {
        userForm.reset();
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error creando la cuenta',
          showConfirmButton: false,
          timer: 1000
        })
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
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getUsers();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un actualizando la cuenta',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  deleteUser(id:string){
  this.userRest.deleteUser(id).subscribe({
    next: (res:any)=>{
      Swal.fire({
        position: 'top',
        title: res.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 900
      })
      this.getUsers();
    },
    error: (err) => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Hubo un error eliminando',
      showConfirmButton: false,
      timer: 1000
    })
  })
  }

}

