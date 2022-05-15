import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/tournament.model';
import { TournamentRestService } from 'src/app/services/tournamentRest/tournament-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']

})
export class TournamentsComponent implements OnInit {
  tour: TournamentModel;
  tours: any;
  tourUpdate: any;
  identity: any;

  constructor(
    private tourRest: TournamentRestService,
    private userRest: UserRestService
  ) {
    this.tour = new TournamentModel('', '')
  }

  ngOnInit(): void {
    this.getTours();
    this.identity = this.userRest.getIdentity().role == 'CLIENT';
  }


  createTour(tourForm: any) {
    this.tourRest.createTour(this.tour).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: 'Torneo',
          icon: 'success',
          text: res.message,
          showConfirmButton: false,
          timer: 900
        })
        this.getTours();
      },
      error: (err) => {
        tourForm.reset();
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error guardando',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }

  getTours() {
    this.tourRest.getTours().subscribe({
      next: (res: any) => {
        return this.tours = res.tournament
      },
      error: (err) => {
        return alert(err.error.message)
      }
    })
  }

  getTour(id: string) {
    this.tourRest.getTour(id).subscribe({
      next: (res: any) => {
        this.tourUpdate = res.tournament;
      },
      error: (err) => {
        return alert(err.error.message)
      }
    })
  }

  updateTour() {
    this.tourRest.updateTour(this.tourUpdate._id, this.tourUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top-end',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getTours();
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

  deleteTour(id: string) {
    this.tourRest.deleteTour(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: 'top',
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 900
        })
        this.getTours();
      },
      error: (err) => {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error eliminando',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }


}
