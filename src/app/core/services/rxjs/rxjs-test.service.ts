import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, retry, shareReplay, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class RxjsTestService {
  private httpClient: HttpClient = inject(HttpClient);

  private $products: Observable<any> | null = null;

  constructor() { }

  getCatmap(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseURL}categories`).pipe(
      map((catRes) => catRes.data.map((oneCat: any) => {
        let cat: any = {};
        cat.name = oneCat.name;
        cat.image = oneCat.image;
        return cat;
      })
      )
    )
  }

  getSpecificCatOfpId(pId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseURL}products/${pId}`).pipe(
      mergeMap((prodRes) => this.httpClient.get<any>(
        `${environment.baseURL}categories/${prodRes.data.category._id}`
      ))
    )
  }

  getResponseFromMultipleAPIs(): Observable<any> {
    return forkJoin({
      products: this.httpClient.get(`${environment.baseURL}products`),
      categories: this.httpClient.get(`${environment.baseURL}categories`),
    })
  }

  getError(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}products`).pipe(
      catchError((err) => {
        console.log('catch error: ' + err);
        return throwError(() => new Error(err));
      })
    )
  }

  getProductsTap(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseURL}products`).pipe(
      tap((res) => console.log('products: ', res.data))
    )
  }

  getProductsWithShareReply(): Observable<any> {
    if (!this.$products) {
      this.$products = this.httpClient.get<any>(`${environment.baseURL}products`).pipe(
        shareReplay(1)
      )
    }
    return this.$products;
  }

  getProductsRetry3TimesBeforeFaild(): Observable<any> {
    return (this.$products = this.httpClient.get<any>(
      `${environment.baseURL}products`
    ).pipe(
      retry(3),
      catchError((err) => {
        console.log('ERROR! after retrying 3 times');
        return throwError(() => new Error(err));
      })
    )
    )
  }

  getProductsWithPriceSearch(pPrice: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}products?price[lte]=${pPrice}`
    )
  }
}
