import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  userId:any;
  constructor(
    private userRest: UserRestService,
    
  ) { 
    this.user = new UserModel('','','','','','');
  }

  ngOnInit(): void {
    this.userId = this.userRest.getIdentity()._id;
  }

  
  getProfile(){
    this.userRest.getUser(this.userId).subscribe({
      next:(response:any)=> this.userId= response.user,
      
      error: (err)=>{
        return alert(err.error.message || err.error)
      }
    })
  }
}
