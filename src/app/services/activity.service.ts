import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { activityDTO } from  '../models/activityDTO';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  getAllActivities(){
    return this.httpClient.get<activityDTO []>(`${environment.apiRootUrl}/Activities/GetAll`)
  }

}
