import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TeamRestService {
  HttpOptions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userRest.getToken());

  constructor(
    private http: HttpClient,
    private userRest: UserRestService

  ) { }

  getTeams(){
    return this.http.get(environment.baseUrl + 'team/getEquipos', {headers: this.HttpOptions})
  }

  createTeam(params:{}){
    return this.http.post(environment.baseUrl + 'team/saveEquipos', params, {headers: this.HttpOptions});
  }

  getTeam(id:string){
    return this.http.get(environment.baseUrl + 'team/getTeam/'+id, {headers: this.HttpOptions})
  }

  updateTeam(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'team/equiposUpdate/'+ id, params, {headers: this.HttpOptions});
  }

  deleteTeam(id:string){
    return this.http.delete(environment.baseUrl + 'team/equiposDelete/'+id, {headers: this.HttpOptions});
  }

  getScores(){
    return this.http.get(environment.baseUrl + 'score/getScores', {headers: this.HttpOptions});
  }

  createScore(params:{}){
    return this.http.post(environment.baseUrl + 'score/createScore', params, {headers: this.HttpOptions})
  }
}
