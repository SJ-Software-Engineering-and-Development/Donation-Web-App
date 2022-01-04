import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/review';

@Injectable({
  providedIn: 'root'
})
export class reviewService {

  constructor(private http:HttpClient) { }

    create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
    }

    getAll(id:string): Observable<any>{
      return this.http.get(`${API_URL}/getByid/${id}`);
    }
    
}