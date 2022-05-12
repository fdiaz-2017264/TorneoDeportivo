import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentRestService {
  HttpOptions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userRest.getToken());

  constructor(
    private http: HttpClient,
    private userRest: UserRestService

  ) { }

  createTour(params: {}) {
    return this.http.post(environment.baseUrl + 'tour/createTour', params, { headers: this.HttpOptions });
  }

  getTours(){
    return this.http.get(environment.baseUrl + 'tour/getTournaments', {headers: this.HttpOptions})
  }

  getTour(id:string){
    return this.http.get(environment.baseUrl + 'tour/getTournament/'+id, {headers: this.HttpOptions})
  }

  updateTour(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'tour/update/'+id, params, {headers: this.HttpOptions});
  }

  deleteTour(id:String){
    return this.http.delete(environment.baseUrl + 'tour/deleteTour/'+id, {headers: this.HttpOptions})
  }

}
