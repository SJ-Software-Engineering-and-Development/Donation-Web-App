import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/donate';

@Injectable({
  providedIn: 'root'
})
export class donationService {

  constructor(private http:HttpClient) { }

    doante(data: any): Observable<any> {
    return this.http.post(API_URL, data);
    }

}