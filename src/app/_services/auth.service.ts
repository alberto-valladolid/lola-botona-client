import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../config'; 

const requestUrl = config.serverApi +'/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(requestUrl + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  // register(user): Observable<any> {
  //   return this.http.post(requestUrl + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   }, httpOptions);
  // }
}