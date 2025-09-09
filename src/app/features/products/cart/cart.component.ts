import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService: CartService = inject(CartService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  cartProducts = signal<any[]>([]);
  totalPrice = signal<any[]>([]);
  cartId = signal<any[]>([]);

  ngOnInit(): void {
    this.getCartData();
  }

  removeItem(pId: string) {
    this.cartService.removeSpecificProduct(pId).subscribe({
      next: (res) => {
        this.toastr.success('Item removed from cart', 'cart operation!');
        this.getCartData();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCartData() {
    this.cartService.getAllCart().subscribe({
      next: (res) => {
        this.cartProducts.set(res.data.products);
        this.totalPrice.set(res.data.totalCartPrice);
        this.cartId.set(res.cartId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCount(pId: string, pCount: number) {
    if (pCount <= 0) {
      this.removeItem(pId);
    }
    else {
      this.cartService.updateCart(pId, pCount).subscribe({
        next: (res) => {
          this.getCartData();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  clearCart() {
    let userRes = confirm('Are you sure');
    if (userRes) {
      this.cartService.clearAllCart().subscribe({
        next: (res) => {
          this.toastr.success('cart cleared', 'cart operation!');
          this.getCartData();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  reqCheckout() {
    this.router.navigate(['/order', this.cartId()]);
  }

}
