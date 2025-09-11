import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { RxjsTestService } from '../../../core/services/rxjs/rxjs-test.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private categoriesService: CategoriesService = inject(CategoriesService);
  private rxjsTestService : RxjsTestService = inject(RxjsTestService);

  allCategories = signal<any>(null);

  ngOnInit(): void {
    this.rxjsTestService.getCategoriesWithShareReply().subscribe({
      next: (res)=>{
        this.allCategories.set(res.data)        
      }
    })
  }
}
