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

  addUser(user: {id: any, username: string, role: string, name: string, password: string}){
    return this.http.post(requestUrl + '/users', user, { responseType: 'json' }); 
  }

  editUser(user: {id: any, username: string, role: string, name: string, password: string }){

    console.log( "antes"+ user.password); 
    if(!user.password){
      user.password = ""; 
    }
    console.log("despues"+  user.password); 
    return this.http.put(requestUrl + '/users/'+ user.id, user, { responseType: 'json' }); 
  }

  deleteUser(id : string){
    return this.http.delete(requestUrl + '/users/' + id, { responseType: 'json' }); 
  }


  getUserById(id : string): Observable<any>{
    return this.http.get(requestUrl + '/users/' + id, { responseType: 'json' }); 
  }


  

}