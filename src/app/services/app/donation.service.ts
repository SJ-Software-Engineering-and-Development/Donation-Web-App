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
    receivedFunds(id:any): Observable<any>{
      return this.http.get(`${API_URL}/${id}`);
    }

    statusUpdate(id:any, status:any): Observable<any>{
      return this.http.patch(`${API_URL}/${id}/${status}`, null);
    }

    getMyDontions(id:any): Observable<any>{
      return this.http.get(`${API_URL}/getMyDonations/${id}`);
    }

    getAllDonations(): Observable<any>{
      return this.http.get(API_URL);
    }

}