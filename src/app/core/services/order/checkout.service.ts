import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private httpClient: HttpClient = inject(HttpClient);

  checkoutSession(cartId: string|null, addressValue: object): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}orders/checkout-session/${cartId}?url=${environment.ecommURL}`,
      {
        shippingAddress: addressValue
      }
    )
  }
}
