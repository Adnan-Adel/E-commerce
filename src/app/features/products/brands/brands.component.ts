import { Component, inject, signal } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { RxjsTestService } from '../../../core/services/rxjs/rxjs-test.service';


@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private brandsService: BrandsService = inject(BrandsService);
  private rxjsTestService : RxjsTestService = inject(RxjsTestService);

  allBrands = signal<any>(null);

  ngOnInit(): void {
    this.rxjsTestService.getBrandsWithShareReply().subscribe({
      next: (res)=>{
        this.allBrands.set(res.data)        
      }
    })
  }
}
