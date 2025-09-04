import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private httpClient : HttpClient = inject(HttpClient);

  addToCart(pId:string):Observable<any> {
    return this.httpClient.post(`${environment.baseURL}cart`,
      {
        productId:pId
      }
    );
  }

  updateCart(pId:string, pCount:number): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}cart/${pId}`,
      {
        count:pCount
      }
    )
  }

  getAllCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}cart`
    )
  }

  removeSpecificProduct(pId:string): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}cart/${pId}`
    )
  }

  clearAllCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}cart`
    )
  }
}
