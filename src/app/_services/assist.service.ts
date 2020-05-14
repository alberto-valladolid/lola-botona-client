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


    // groupId: sorters.groupId.toString(),
    // userId: sorters.userId.toString(),
    // type: sorters.type.value,
    //return this.http.get(adminApiUrl + '/calendar/calendardata/' + monthNumber, { responseType: 'json' }); 
  }

}
