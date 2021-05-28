import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { userInsertDTO } from '../models/userInsertDTO';
import { responseDTO } from '../models/responseDTO';
import { userSearchParams } from '../models/userSearchParams';
import { IPagination } from '../models/IPagination';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient : HttpClient) { }


  Insert(userDTO: userInsertDTO){
    return this.httpClient.post<responseDTO>(`${environment.apiRootUrl}/Users/Insert`, userDTO);
  }


  getUsers(userParams : userSearchParams){

    let params = new HttpParams();

      return this.httpClient.post<IPagination>(`${environment.apiRootUrl}/Users/Search`, userParams );
      

  }

}
