import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config from '../config';
import { HttpClient } from '@angular/common/http';


const adminApiUrl = config.serverApi +'/api/secure';
const requestUrl = config.serverApi +'/api';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {



  constructor(private http: HttpClient) { }

  getAppConfig(): Observable<any> {
    return this.http.get(adminApiUrl + '/app-config', { responseType: 'json' });
  }

  editAppConfig(appConfig: { eventMinutes: number,absenceDays: number}){
    return this.http.put(adminApiUrl + '/app-config', appConfig, { responseType: 'json' }); 
  }

  // editGroup(group: {id: any, capacity: number, description: string, active: boolean, dayofweek: number,    showorder :string}){
  //   return this.http.put(adminApiUrl + '/groups/' + group.id, group, { responseType: 'json' }); 
  // }


}
