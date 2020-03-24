import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../config'; 

const requestUrl = config.serverApi +'/secure/rest';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(requestUrl + '/users', { responseType: 'json' });
  }

  getPublicContent(): Observable<any> {
    return this.http.get(config.serverApi + '/api/test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(config.serverApi + '/api/test/user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(config.serverApi + '/api/test/admin', { responseType: 'text' });
  }
}