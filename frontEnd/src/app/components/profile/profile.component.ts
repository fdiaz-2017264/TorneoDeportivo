import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  usUpdate:any;

  constructor(
    private userRest: UserRestService,
    public router: Router
  ) { 
    this.user = new UserModel('','','','','','');
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userRest.getUser(this.userRest.getIdentity()._id).subscribe({
      next: (res: any) => this.usUpdate = res.user,
      error: (err)=> alert(err.error.message)
    })
  }

  update(){
    this.usUpdate.password = undefined;
    this.usUpdate.role = undefined;
    this.userRest.update(this.usUpdate._id, this.usUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getUser();
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

  deleteUser(){
    this.userRest.delete(this.userRest.getIdentity()._id).subscribe({
      next: (res:any)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        Swal.fire({
          position: 'top',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 900
        })
        this.router.navigateByUrl('/login');
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
