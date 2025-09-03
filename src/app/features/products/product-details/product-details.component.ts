import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/interfaces/product';


@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  private productService : ProductService = inject(ProductService);

  pId : string|null = "";
  product = signal<Product>({} as Product);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p)=> {
        this.pId = p.get('pId');

        this.productService.getSpecificProduct(this.pId).subscribe({
          next:(res)=>{
            this.product.set(res.data);
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    })
  }
}
