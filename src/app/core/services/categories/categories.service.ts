import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private httpClient: HttpClient = inject(HttpClient);
  
  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}categories`);
  }
  getSpecificCategory(cId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}categories/${cId}`);
  }
}
