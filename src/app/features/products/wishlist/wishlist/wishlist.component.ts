import { Component, computed, inject, signal } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private wishlistService: WishlistService = inject(WishlistService);
  private cartService: CartService = inject(CartService);
  private toastr: ToastrService = inject(ToastrService);

  wishlist = signal<any[]>([]);


  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlist.set(res.data);
      },
      error: () => {
        this.toastr.error('Failed to load wishlist');
      }
    });
  }

  removeItem(pId: string) {
    this.wishlistService.removeFromWishlist(pId).subscribe({
      next: () => {
        this.toastr.info('Item removed from wishlist');
        this.loadWishlist();
      },
      error: () => {
        this.toastr.error('Failed to remove item');
      }
    });
  }

  addToCart(pId: string) {
    this.cartService.addToCart(pId).subscribe({
      next: () => {
        this.toastr.success('Item moved to cart');
        this.removeItem(pId);
      },
      error: () => {
        this.toastr.error('Failed to add item to cart');
      }
    });
  }
}
