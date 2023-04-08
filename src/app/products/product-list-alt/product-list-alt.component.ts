import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EMPTY, Subject, Subscription, catchError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMesssageSubject = new Subject<string>();
  errorMessage$ = this.errorMesssageSubject.asObservable();

  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMesssageSubject.next(err);
        return EMPTY;
      })
    );

  selectedProduct$ = this.productService.selectedProducts$;

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
    this.productService.selectedProductChanged(productId);
  }
}
