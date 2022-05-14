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

  constructor(
    private teamRest: TeamRestService,
    public activatedRoute: ActivatedRoute

  ) {
    this.team = new TeamModel('', '', 0, 0, '');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idL: any) => {
      this.idLeague = idL.get('idL');
    })
    this.getTeams()
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
}
