import { Component, OnInit } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';
import { TeamRestService } from '../../services/teamRest/team-rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league-description',
  templateUrl: './league-description.component.html',
  styleUrls: ['./league-description.component.css']
})
export class LeagueDescriptionComponent implements OnInit {
  team: TeamModel
  teams: any
  teamUpdate: any
  idLeague: any
  view: any = [700, 400];
  points: [{name: string,value: number}]

  constructor(
    private teamRest: TeamRestService,
    public activatedRoute: ActivatedRoute

  ) {
    this.team = new TeamModel('', '', 0, 0, '');
    this.points = ([{name:'', value: 0}])
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idL: any) => {
      this.idLeague = idL.get('idL');
    })
    this.getTeams()
  }

  getPoints(){
    this.teamRest.getTeams().subscribe({
      next: (res: any) => {
          this.points = res.points
      },
      error: (err) => alert(err.error.message)
    })
  }

  getTeams() {
    this.teamRest.getTeams().subscribe({
      next: (res: any) => {
        this.teams = res.teams
      },
      error: (err) => alert(err.error.message)
    })
  }

  createTeam(teamForm: any) {
    this.team.league = this.idLeague;
    this.teamRest.createTeam(this.team).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.getTeams();
        teamForm.reset();
      },
      error: (err) => {
        alert(err.error.message || err.error)
      }
    })
  }

  getTeam(id: string) {
    this.teamRest.getTeam(id).subscribe({
      next: (res: any) => this.teamUpdate = res.team,
      error: (err) => alert(err.error.message)
    })
  }

  updateTeam() {
    this.teamRest.updateTeam(this.teamUpdate._id, this.teamUpdate).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.getTeams();
      },
      error: (err) => alert(err.error.message || err.error)
    })
  }

  deleteTeam(id: string) {
    this.teamRest.deleteTeam(id).subscribe({
      next: (res: any) => {
        alert(res.message)
        this.getTeams();
      },
      error: (err) => alert(err.error.message || err.error)
    })
  }

  /* Graficas*/
  
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
