import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  HttpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  register(params:{}){
      return this.http.post(environment.baseUrl + 'user/register', params, {headers: this.HttpOptions});
  }

  login(params:{}){
    return this.http.post(environment.baseUrl + 'user/login', params, {headers: this.HttpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  }

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity;
  }

}
