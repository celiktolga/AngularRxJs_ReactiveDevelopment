import { Component, /*OnInit,*/ ChangeDetectionStrategy } from '@angular/core';

import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { EMPTY, Observable, catchError, of } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush //ekranda error göstermesini engelliyor, yeni bir input varsa algılıyor.
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  //products$: Observable<Product[]> | undefined;
  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
      })
    );

  constructor(private productService: ProductService) { }

  /*ngOnInit(): void {
    this.products$ = this.productService.getProducts()
      .pipe(
        catchError(err => {
          this.errorMessage = err
          return EMPTY;//of([])
        })
      );
  }*/

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
