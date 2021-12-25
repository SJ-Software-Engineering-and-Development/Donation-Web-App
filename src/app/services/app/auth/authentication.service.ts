import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/index';
import { HttpClientModule } from '@angular/common/http';

const AUTH_API = 'http://localhost:8081/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
/**
 * Author : SJ.Peeris
 * 
 */

  isValid:boolean;
  constructor(private http:HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API+'auth' , {
      email: credentials.username,
      password: credentials.password,
    }, httpOptions);
  }

  logout(email:string): Observable<any> {
    return this.http.post(AUTH_API+ 'users/signout' , {
      email: email
    });
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('auth-token')
    // console.log(!(user === null))
    return !(user === null)
  }

  // logOut(){
  //   sessionStorage.removeItem('user')
  // }
}
