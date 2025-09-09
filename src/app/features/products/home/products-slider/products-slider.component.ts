import { Component, Input } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-products-slider',
  imports: [CarouselModule],
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.scss'
})
export class ProductsSliderComponent {
  @Input() products: Product[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
