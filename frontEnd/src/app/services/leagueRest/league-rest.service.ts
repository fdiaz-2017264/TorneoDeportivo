import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';


@Injectable({
  providedIn: 'root'
})
export class LeagueRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userRest.getToken()).set('Access-Control-Allow-Origin', 'localhost:4200');
  
  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  getLeagues(){
    return this.http.get(environment.baseUrl + 'league/getLeagues', {headers: this.httpOptions});
  }

  saveLeague(params:{}){
    return this.http.post(environment.baseUrl + 'league/saveLeague', params, {headers: this.httpOptions});
  }

  updateLeague(id: string, params:{}){
    return this.http.put(environment.baseUrl + 'league/updatedLeague/' + id, params, {headers: this.httpOptions});
  }

  deleteLeague(id: string){
    return this.http.delete(environment.baseUrl + 'league/deleteLeague/' + id, {headers: this.httpOptions});
  }

  getLeague(id: string){
    return this.http.get(environment.baseUrl + 'league/getLeague/' + id, {headers: this.httpOptions});
  }
  
}
