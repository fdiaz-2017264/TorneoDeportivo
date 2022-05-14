import { Component, OnInit } from '@angular/core';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';
import { LeagueModel } from 'src/app/models/league.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {
  leagues: any;
  league: LeagueModel;
  leagueUpdate: any;
  idTour: any;


  constructor(
    private leagueRest: LeagueRestService,
    public activatedRoute: ActivatedRoute
  ) {
    this.league = new LeagueModel('', '', '', '', 0, '', '')
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idT: any) => {
      this.idTour = idT.get('idT');
    })
    this.getLeagues();

  }

  getLeagues() {
    this.leagueRest.getLeagues().subscribe({
      next: (res: any) => {
        this.leagues = res.leagues
      },
      error: (err) => alert(err.error.message)
    })

  }



  getLeague(id: string) {
    this.leagueRest.getLeague(id).subscribe({
      next: (res: any) => this.leagueUpdate = res.league,
      error: (err) => alert(err.error.message)
    })
  }

  saveLeague(addLeagueForm: any) {
    this.league.tournament = this.idTour;
    this.leagueRest.saveLeague(this.league).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: 'Liga',
          icon: 'success',
          text: res.message,
          showConfirmButton: false,
          timer: 900
        })
        this.getLeagues();

        addLeagueForm.reset();

      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error guardando',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  updateLeague() {
    this.leagueRest.updateLeague(this.leagueUpdate._id, this.leagueUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getLeagues();
      },
      error: (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error actualizando',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }

  deleteLeague(id: string) {
    this.leagueRest.deleteLeague(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 900
        })
        this.getLeagues();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error eliminando',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

}
