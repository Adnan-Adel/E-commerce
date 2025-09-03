import { Component, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { CardComponent } from '../card/card/card.component';

@Component({
  selector: 'app-products-shared',
  imports: [CardComponent],
  templateUrl: './products-shared.component.html',
  styleUrl: './products-shared.component.scss'
})
export class ProductsSharedComponent {
  @Input() products : Product[] = [];
}
