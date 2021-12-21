import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/funds';

@Injectable({
  providedIn: 'root'
})
export class fundService {

  constructor(private http:HttpClient) { }

    create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
    }

    getByStatus(status: any): Observable<any> {
    return this.http.get(`${API_URL}/${status}`);
    }

}