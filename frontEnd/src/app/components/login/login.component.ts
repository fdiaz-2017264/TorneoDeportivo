import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  constructor(
    private userRest: UserRestService,
    private router: Router
  ) {
    this.user = new UserModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.registerAdmin();
  }

  login(loginForm: any) {
    this.userRest.login(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logeado',
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.alreadyUse));
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        loginForm.reset();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }

  registerAdmin() {
    this.userRest.createAdmin().subscribe({
      next: (response: any) => {
        this.user = response.save
      },
      error: (err) => alert(err.error.message)
    })
  }


}
