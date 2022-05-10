import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import {Router} from '@angular/router';

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
      next: (response:any)=>{
          alert(response.message);
          return this.router.navigateByUrl('/login');
      },
      error:(err)=>{
        registerForm.reset();
        return alert(err.error.message || err.error)
      }
      
    })
  }

  
}
