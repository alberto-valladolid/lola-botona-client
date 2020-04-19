import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../config'; 

const adminApiUrl = config.serverApi +'/api/secure';

const requestUrl = config.serverApi +'/api';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(adminApiUrl + '/users', { responseType: 'json' });
  }

  getPublicContent(): Observable<any> {
    return this.http.get(requestUrl+ '/user', { responseType: 'text' });
  }

  addUser(user: {id: any, username: string, role: string, name: string, password: string}){
    return this.http.post(adminApiUrl + '/users', user, { responseType: 'json' }); 
  }

  editUser(user: {id: any, username: string, role: string, name: string, password: string }){


    if(!user.password){
      user.password = ""; 
    }
    return this.http.put(adminApiUrl + '/users/'+ user.id, user, { responseType: 'json' }); 
  }

  deleteUser(id : string){
    return this.http.delete( adminApiUrl + '/users/' + id, { responseType: 'json' }); 
  }


  getUserById(id : string): Observable<any>{
    return this.http.get(adminApiUrl + '/users/' + id, { responseType: 'json' }); 
  }

  changePassword(user: { currentPassword: string, newPassword: string }){
    return this.http.put(requestUrl + '/users/password', user, { responseType: 'json' }); 
 
  }
 
  getPendingRetrieves() : Observable<any>{
    return this.http.get(requestUrl + '/users/pending-retrieves',  { responseType: 'json' }); 
 
  }


}