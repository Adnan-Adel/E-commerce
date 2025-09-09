import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../core/services/order/checkout.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  private checkoutService : CheckoutService = inject(CheckoutService);
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);

  cartId = signal<string|null>(null);
  
  addressForm : FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
  })

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((p)=>{
      this.cartId.set(p.get('cartId'));
    })
  }

  checkout() {
    this.checkoutService.checkoutSession(this.cartId(), this.addressForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        window.location.href = res.session.url;
      },
      error:(err)=>{

      }
    })
  }
}
