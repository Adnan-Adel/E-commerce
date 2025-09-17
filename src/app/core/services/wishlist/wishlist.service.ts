import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private httpClient: HttpClient = inject(HttpClient);

  wishlist = signal<string[]>([]);
  wishlistCount = computed(() => this.wishlist().length);

  addToWishlist(pId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}wishlist`,
      {
        productId: pId
      }
    ).pipe(
      tap(()=>{
        this.wishlist.update((list) => [...list, pId]);
      })
    )
  }
  removeFromWishlist(pId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}wishlist/${pId}`).pipe(
      tap(()=>{
        this.wishlist.update((list) => list.filter((id) => id !== pId));
      })
    )
  }
  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}wishlist`)
  }

  isInWishlist(pId: string) {
    return this.wishlist().includes(pId);
  }
}
