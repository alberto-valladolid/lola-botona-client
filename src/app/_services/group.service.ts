import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../config';

const adminApiUrl = config.serverApi +'/api/secure';

const requestUrl = config.serverApi +'/api';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.http.get(adminApiUrl + '/groups', { responseType: 'json' });
  }

  deleteGroup(id : string){
    return this.http.delete( adminApiUrl + '/groups/' + id, { responseType: 'json' }); 
  }


  addGroup(group: {id: any, capacity: number, description: string, active: boolean, dayofweek: number,    showorder :string,  startTimeHours:number, startTimeMins:number}){
    return this.http.post(adminApiUrl + '/groups', group, { responseType: 'json' }); 
  }

  editGroup(group: {id: any, capacity: number, description: string, active: boolean, dayofweek: number,    showorder :string,  startTimeHours:number, startTimeMins:number}){
    return this.http.put(adminApiUrl + '/groups/' + group.id, group, { responseType: 'json' }); 
  }

  getGroupById(id : string): Observable<any>{
    return this.http.get(adminApiUrl + '/groups/' + id, { responseType: 'json' }); 
  }
  
}
