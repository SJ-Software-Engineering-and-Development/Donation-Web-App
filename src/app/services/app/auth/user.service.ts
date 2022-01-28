import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  userSignup(profile:any, login:any ): Observable<any> {
    //`users/signup/${newUser.login.role}`
    return this.http.post(API_URL +`users/signup/${login.role}` , {
      userProfile:  {
        firstName:profile.firstName,
        middleName:profile.middleName,
        lastName:profile.lastName,
        address:profile.address,
        contact:profile.contact,
        collectingAgentId:profile.collectingAgentId,
        coordinatorId:profile.coordinatorId,
        collectingRegionId:profile.collectingRegionId,
        login: {
          name:login.name,
          email:login.email.toLowerCase(),
          password:login.password,
          avatar:login.avatar
        }
      },
    });
  }

  getAllUsers(): Observable<any>{
    return this.http.get(API_URL + "users/get");
  }
}
