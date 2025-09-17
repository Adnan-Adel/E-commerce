import { Component, inject, signal } from '@angular/core';
import { RxjsTestService } from '../../../core/services/rxjs/rxjs-test.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private rxjsTestService: RxjsTestService = inject(RxjsTestService);

  allBrands = signal<any[]>([]);
  selectedBrand = signal<any | null>(null); // for modal

  ngOnInit(): void {
    this.rxjsTestService.getBrandsWithShareReply().subscribe({
      next: (res) => {
        this.allBrands.set(res.data);
      }
    });
  }

  openBrand(brand: any) {
    this.selectedBrand.set(brand);
  }

  closeModal() {
    this.selectedBrand.set(null);
  }
}
