import { Component, inject, signal } from '@angular/core';
import { StaticSliderComponent } from "./static-slider/static-slider.component";
import { ProductsSliderComponent } from "./products-slider/products-slider.component";
import { ProductsSharedComponent } from "../../../shared/components/products-shared/products-shared.component";
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-home',
  imports: [StaticSliderComponent, ProductsSliderComponent, ProductsSharedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  allProducts = signal<Product[]>([]);
  private productService : ProductService = inject(ProductService);

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next : (res)=> {
        this.allProducts.set(res.data);
        console.log(res);
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }
}
