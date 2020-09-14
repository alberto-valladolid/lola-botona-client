import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config from '../config';
import { HttpClient } from '@angular/common/http';

const adminApiUrl = config.serverApi +'/api/secure';
const requestUrl = config.serverApi +'/api';

@Injectable({
  providedIn: 'root'
})
export class AssistService {

  constructor(private http: HttpClient) { }



  getAssistData(sorters:{type: any, userId: any, groupId: any, fromDate: string, toDate: string}): Observable<any> {
    console.log(sorters); 
    return this.http.get(adminApiUrl + '/events', {params: {
      groupId: sorters.groupId,
      userId: sorters.userId,
      type: sorters.type,
      fromDate: sorters.fromDate,
      toDate: sorters.toDate,          
    },responseType: 'json' });

  }

  addAssist(group: {id: any,  date: string,  userId: any, groupId: any, addDeleteRetrieve:string}){
    return this.http.post(adminApiUrl + '/events', group, { responseType: 'json' }); 
  }


  deleteUserGroup(id : string){
    return this.http.delete( adminApiUrl + '/events/' + id, { responseType: 'json' }); 
  }

}
