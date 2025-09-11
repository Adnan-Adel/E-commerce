import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private httpClient: HttpClient = inject(HttpClient);
  
  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}brands`);
  }
  getSpecificBrand(bId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}brands/${bId}`);
  }
}
