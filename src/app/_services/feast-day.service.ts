import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../config';

const adminApiUrl = config.serverApi +'/api/secure';

const requestUrl = config.serverApi +'/api';

@Injectable({
  providedIn: 'root'
})
export class FeastDayService {

  constructor(private http: HttpClient) { }

  getAllFeastDays(): Observable<any> {
    return this.http.get(adminApiUrl + '/feast-days', { responseType: 'json' });
  }

  deleteFeastDay(id : string){
    return this.http.delete( adminApiUrl + '/feast-days/' + id, { responseType: 'json' }); 
  }


  addFeastDay(group: {id: any,  date: string}){
    return this.http.post(adminApiUrl + '/feast-days', group, { responseType: 'json' }); 
  }

}
