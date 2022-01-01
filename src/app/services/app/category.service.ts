import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/categories';

@Injectable({
  providedIn: 'root'
})
export class categoryService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${API_URL}/all/`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  update(data:any): Observable<any> {
    return this.http.patch(API_URL, data);
  }
  
  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
  

}