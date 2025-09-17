import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private productService: ProductService = inject(ProductService);
  private cartService: CartService = inject(CartService);
  private toastr: ToastrService = inject(ToastrService);

  pId: string | null = "";
  product = signal<Product>({} as Product);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.pId = p.get('pId');
        if (!this.pId) return;

        this.productService.getSpecificProduct(this.pId).subscribe({
          next: (res) => {
            this.product.set(res.data);
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  addProduct() {
    const pId = this.product()?.id;
    if (!pId) return;

    this.cartService.addToCart(pId).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Cart Operation!', {
          closeButton: true
        });
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to add product to cart', 'Cart Operation');
      }
    });
  }
}
