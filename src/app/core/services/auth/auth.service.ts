import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { User } from '../../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private httpClient : HttpClient = inject(HttpClient);
  
  userData = new BehaviorSubject(null);

  registerAPI(registerData: object):Observable<any> {
    return this.httpClient.post(`${environment.baseURL}auth/signup`, registerData);
  }

  loginAPI(registerData: object):Observable<any> {
    return this.httpClient.post(`${environment.baseURL}auth/signin`, registerData);
  }

  setUserData() {
    let token = localStorage.getItem('userToken');
    if(token) {
      this.userData.next(jwtDecode(token));
    }

  }
}
