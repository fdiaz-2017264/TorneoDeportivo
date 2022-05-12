import { Component, OnInit } from '@angular/core';
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
    private userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity().role == 'CLIENT';
  }


}
