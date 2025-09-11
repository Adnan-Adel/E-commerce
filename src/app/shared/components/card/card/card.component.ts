import { WishlistService } from './../../../../core/services/wishlist/wishlist.service';
import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-card',
  imports: [RouterLink, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private cartService: CartService = inject(CartService);
  private toastr: ToastrService = inject(ToastrService);
  private wishlistService: WishlistService = inject(WishlistService);

  @Input() product: Product = {} as Product;

  isInWishlist = signal(false);

  addProduct(pId: string) {
    this.cartService.addToCart(pId).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'cart operation!', {
          closeButton: true
        })
      },
      error: (err) => {

      }
    });
  }

  toggleWishlist(pId: string) {
    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishlist(pId).subscribe({
        next:()=>{
          this.isInWishlist.set(false);
          this.toastr.info('Removed from wishlist', 'Wishlist');
        }
      })  
    }
    else {
      this.wishlistService.addToWishlist(pId).subscribe({
        next:()=>{
          this.isInWishlist.set(true);
          this.toastr.info('Added to wishlist', 'Wishlist');
        }
      })
    }
  }
}
