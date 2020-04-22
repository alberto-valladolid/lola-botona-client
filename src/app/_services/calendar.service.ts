import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config from '../config';
import { HttpClient } from '@angular/common/http';


const adminApiUrl = config.serverApi +'/api/secure';
const requestUrl = config.serverApi +'/api';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  constructor(private http: HttpClient) { }


  getCalendarData(): Observable<any> {
    return this.http.get(requestUrl + '/calendar/calendardata', { responseType: 'json' });
  }

  createRetrieve(date: { newPassword: any } , groupid:number) : Observable<any>{
    return this.http.post(requestUrl + '/calendar/createRetrieve',   {date:date, groupid:groupid }  , { responseType: 'json' }); 

  }

  createAbsence(date: { newPassword: any } , groupid:number) : Observable<any>{
    return this.http.post(requestUrl + '/calendar/createAbsence',   {date:date, groupid:groupid }  , { responseType: 'json' }); 

  }
  
}