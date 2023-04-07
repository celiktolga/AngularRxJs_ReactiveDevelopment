import { Component, /*OnInit,*/ ChangeDetectionStrategy } from '@angular/core';

import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, filter, map, of, startWith } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush //ekranda error göstermesini engelliyor, yeni bir input varsa algılıyor.
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  //categories: ProductCategory[] = [];
  //selectedCategoryId = 1;
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categoryselectedAction$ = this.categorySelectedSubject.asObservable();

  //products$: Observable<Product[]> | undefined;
  /*products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
      })
    );*/

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categoryselectedAction$
      /*.pipe(
        startWith(0)
      ) we can use startWith initial value or BehaviorSubject*/
  ])
    .pipe(
      map(([products, selectedCategoryId]) =>
        products.filter(product =>
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
        )),

        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
    )

  categories$ = this.productCategoryService.productCategories$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      )

  /*productsSimpleFilter$ = this.productService.productsWithCategory$
    .pipe(
      map(products =>
        products.filter(product =>
          this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true //return all ıf there is no selecte category id
        ))
      )*/

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }

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
    //console.log('Not yet implemented');
    //this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId); //+ sign convert string to number
  }
}

/*
use Subject ıf you dont need an initial value
use BehaviorSubject if you want initial value
  -important when using cobineLatest  (wont emit until each of its input stream emit.)
*/
