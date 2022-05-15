import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { TeamRestService } from 'src/app/services/teamRest/team-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  view: any = [800, 500];
  points: any
  scores:any

  constructor(
    private teamRest:TeamRestService
  ) {}

  ngOnInit(): void {
  }

  getPoints(){
    this.teamRest.getTeams().subscribe({
      next: (res: any) => {
          this.points = res.points
      },
      error: (err) => alert(err.error.message)
    })
  }
  
  getScores() {
    this.teamRest.getScores().subscribe({
      next: (res: any) => {
        this.scores = res.score
      },
      error: (err) => alert(err.error.message)
    })
  }

  /* Graficas*/

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
