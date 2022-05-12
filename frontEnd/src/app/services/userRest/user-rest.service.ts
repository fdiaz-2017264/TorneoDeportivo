import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  HttpOptions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

  constructor(private http: HttpClient) { }

  register(params: {}) {
    return this.http.post(environment.baseUrl + 'user/register', params, { headers: this.HttpOptions });
  }

  login(params: {}) {
    return this.http.post(environment.baseUrl + 'user/login', params, { headers: this.HttpOptions });
  }

  getUser(id: string) {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id, { headers: this.HttpOptions })
  }

  getUsers() {
    return this.http.get(environment.baseUrl + 'user/getUsers', { headers: this.HttpOptions });
  }

  saveUser(params: {}) {
    return this.http.post(environment.baseUrl + 'user/saveUser', params, { headers: this.HttpOptions });
  }

  //Admin
  updateUser(id: string, params: {}) {
    return this.http.put(environment.baseUrl + 'user/update/' + id, params, { headers: this.HttpOptions });
  }
  //Admin
  deleteUser(id:string){
    return this.http.delete(environment.baseUrl + 'user/delete/'+ id, {headers: this.HttpOptions})
  }


  createAdmin() {
    return this.http.get(environment.baseUrl + 'user/createAdmin', { headers: this.HttpOptions })
  }

  //client
  update(id: string, params: {}) {
    return this.http.put(environment.baseUrl + 'user/updateUser/' + id, params, { headers: this.HttpOptions });
  }

  //client|
  delete(id:string){
    return this.http.delete(environment.baseUrl + 'user/deleteUser/'+ id, {headers: this.HttpOptions})
  }

  getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = '';
    }
    return token;
  }

  getIdentity() {
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if (globalIdentity != undefined) {
      identity = JSON.parse(globalIdentity);
    } else {
      identity = '';
    }
    return identity;
  }

}
