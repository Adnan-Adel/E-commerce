import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient : HttpClient = inject(HttpClient);
  
  getAllProducts() : Observable<any> {
    return this.httpClient.get(`${environment.baseURL}products`);
  }
  getSpecificProduct(pId:string|null) : Observable<any> {
    return this.httpClient.get(`${environment.baseURL}products/${pId}`);
  }
}
