import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { User } from '../../interfaces/user';
import { PlatformService } from '../platform/platform.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private platformService: PlatformService = inject(PlatformService);

  userData = new BehaviorSubject<any>(null);

  constructor() {
    if (this.platformService.checkPlatformBrowser()) {
      if (localStorage.getItem('userToken')) {
        this.setUserData();
      }
    }
  }

  registerAPI(registerData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}auth/signup`, registerData);
  }

  loginAPI(registerData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}auth/signin`, registerData);
  }

  setUserData() {
    let token = localStorage.getItem('userToken');
    if (token) {
      this.userData.next(jwtDecode(token));
    }
    else {
      this.userData.next(null);
    }
  }

  forgotPassword(userEmail: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}auth/forgotPasswords`, {
      "email": userEmail
    })
  }
  verifyResetCode(resetCode: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}auth/verifyResetCode`, {
      "resetCode": resetCode
    })
  }
  resetPassword(userEmail: string, newPassword: string): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}auth/resetPassword`, {
      "email": userEmail,
      "newPassword": newPassword
    })
  }
}
