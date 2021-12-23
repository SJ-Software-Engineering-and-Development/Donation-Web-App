import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root'
})
export class registrationService {

  constructor(private http:HttpClient) { }

  createUser(data: any, role: string=''): Observable<any> {
    console.log(data);
    
    return this.http.post(API_URL + 'users/signup/' + role, data);
  }
}