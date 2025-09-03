import { Component, Input } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product : Product = {} as Product;
}
