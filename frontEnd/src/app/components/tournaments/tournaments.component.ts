import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/tournament.model';
import { TournamentRestService } from 'src/app/services/tournamentRest/tournament-rest.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']

})
export class TournamentsComponent implements OnInit {
  tour: TournamentModel;
  tours:any;
  tourUpdate:any;

  constructor(
    private tourRest: TournamentRestService,
  ) {
    this.tour = new TournamentModel('', '')
  }

  ngOnInit(): void {
    this.getTours();
  }


  createTour(tourForm: any) {
    this.tourRest.createTour(this.tour).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.getTours();
      },
      error: (err) => {
        tourForm.reset();
        return alert(err.error.message || err.error)
      }
    })
  }

  getTours() {
    this.tourRest.getTours().subscribe({
      next: (res: any) => {
        return this.tours = res.tournament
      },
      error:(err)=>{
        return alert(err.error.message)
      }
    })
  }

  getTour(id:string){
    this.tourRest.getTour(id).subscribe({
      next: (res:any)=>{
        this.tourUpdate = res.tournament;
      },
      error: (err)=>{
        return alert(err.error.message)
      }
    })
  }

  updateTour(){
    this.tourRest.updateTour(this.tourUpdate._id, this.tourUpdate).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getTours();
      },
      error: (err)=>{
        return alert(err.error.message || err.error)
      }
    })
  }

  deleteTour(id:string){
    this.tourRest.deleteTour(id).subscribe({
      next: (res:any)=> {
        alert(res.message);
        this.getTours();
      },
      error: (err)=>{
        return alert(err.error.message)
      }
    })
  }


}
