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
    return this.http.get(requestUrl + '/calendardata', { responseType: 'json' });
  }

  
}
