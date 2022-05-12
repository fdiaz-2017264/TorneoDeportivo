import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

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
    this.user = new UserModel('','','','','','');
   }

  ngOnInit(): void {
    this.registerAdmin();
  }

  login(loginForm:any){
    this.userRest.login(this.user).subscribe({
      next:(res:any)=>{
        alert(res.message)
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.alreadyUse));
        this.router.navigateByUrl('/');
      },
      error: (err)=>{
        loginForm.reset();
        return alert(err.error.message || err.error)
      }
    })
  }

  registerAdmin(){
    this.userRest.createAdmin().subscribe({
      next: (response:any)=>{
        this.user = response.save
      },
      error:(err)=> alert(err.error.message)
    })
  }

  
}
