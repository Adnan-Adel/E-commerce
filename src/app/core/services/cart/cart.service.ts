import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private httpClient: HttpClient = inject(HttpClient);

  cartCount = signal<number>(0);

  addToCart(pId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}cart`,
      {
        productId: pId
      }
    ).pipe(
      tap((res: any) => {
        this.cartCount.set(res.numOfCartItems);
      })
    );
  }

  updateCart(pId: string, pCount: number): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}cart/${pId}`,
      {
        count: pCount
      }
    )
  }

  getAllCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}cart`).pipe(
      tap((res: any) => {
        this.cartCount.set(res.numOfCartItems);
      })
    );
  }

  removeSpecificProduct(pId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}cart/${pId}`
    ).pipe(
      tap((res: any) => {
        this.cartCount.set(res.numOfCartItems);
      })
    );
  }

  clearAllCart(): Observable<any> {
    this.cartCount.set(0);
    return this.httpClient.delete(`${environment.baseURL}cart`
    )
  }
}
