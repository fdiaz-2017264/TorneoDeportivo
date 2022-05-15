import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  token:any;
  identity:any;
  constructor(
    private userRest: UserRestService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity().role == 'CLIENT';
  }

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('identity')
    this.router.navigateByUrl('/login')
  }
}
