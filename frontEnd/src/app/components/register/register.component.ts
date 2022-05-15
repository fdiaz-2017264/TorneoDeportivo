import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel;

  constructor(
    private userRest: UserRestService,
    private router: Router
    ) {
    this.user = new UserModel('','','','','','');

   }


  ngOnInit(): void {
  }

  register(registerForm:any){
    this.userRest.register(this.user).subscribe({
      next: (res:any)=>{
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
          return this.router.navigateByUrl('/login');
      },
      error:(err)=>{
        registerForm.reset();
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

  
}
