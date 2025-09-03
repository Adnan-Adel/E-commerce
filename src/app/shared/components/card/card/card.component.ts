import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private cartService: CartService = inject(CartService);
  private toastr: ToastrService = inject(ToastrService);

  @Input() product: Product = {} as Product;

  addProduct(pId: string) {
    this.cartService.addToCart(pId).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'cart operation!',{
          closeButton:true
        })
      },
      error: (err) => {

      }
    });
  }
}
