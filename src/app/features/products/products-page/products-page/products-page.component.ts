import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/interfaces/product';
import { ProductsSharedComponent } from "../../../../shared/components/products-shared/products-shared.component";
import { RxjsTestService } from '../../../../core/services/rxjs/rxjs-test.service';

@Component({
  selector: 'app-products-page',
  imports: [ProductsSharedComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  allProducts = signal<Product[]>([]);
  private productService: ProductService = inject(ProductService);
  private rxjsTestService : RxjsTestService = inject(RxjsTestService);
  

  ngOnInit() {
    this.rxjsTestService.getProductsWithShareReply().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
