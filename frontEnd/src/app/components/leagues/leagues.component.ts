import { Component, OnInit } from '@angular/core';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';
import { LeagueModel } from 'src/app/models/league.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {
  leagues: any;
  league: LeagueModel;
  leagueUpdate: any;
  search: any;



  constructor(
    private leagueRest: LeagueRestService
  ) {
    this.league = new LeagueModel('', '','','',0,'')
   }

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues(){
    this.leagueRest.getLeagues().subscribe({
      next: (res: any) => this.leagues = res.leagues,
      error: (err)=>alert(err.error.message)
    })
  }

  getLeague(id: string){
    this.leagueRest.getLeague(id).subscribe({
      next: (res: any)=> this.search = res.league,
      error: (err)=> alert(err.error.message)
    })
  }

  saveLeague(addLeagueForm: any){
    this.leagueRest.saveLeague(this.league).subscribe({
      next: (res: any)=> {
        alert(res.message);
        this.getLeagues();
        addLeagueForm.reset();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  updateLeague(){
    this.leagueRest.updateLeague(this.leagueUpdate._id, this.leagueUpdate).subscribe({
      next: (res:any)=> {
        alert(res.message);
        this.getLeagues();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  deleteLeague(id: string){
    this.leagueRest.deleteLeague(id).subscribe({
      next: (res:any)=> {
        alert(res.message);
        this.getLeagues();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }
}
