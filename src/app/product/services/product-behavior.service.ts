import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncState } from 'ngx-extension';
import { BehaviorSubject, catchError, delay, EMPTY, Observable, of, tap } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable()
export class ProductBehaviorService {
  private http = inject(HttpClient);

  private productBS = new BehaviorSubject<AsyncState<Product[]>>({
    loading: true,
    error: null,
    data: [],
  });
  productsState$ = this.productBS.asObservable();

  get state() {
    return this.productBS.getValue();
  }

  setProducts(fn: (state: AsyncState<Product[]>) => Partial<AsyncState<Product[]>>) {
    const newState = fn(this.state);
    this.productBS.next({ ...this.state, ...newState });
  }

  getProducts(): Observable<Product[]> {
    this.productBS.next({ ...this.state, loading: true });

    // return this.http.get<Product[]>('/api/products').pipe(
    return of([
      {
        id: '1',
        name: 'Basketball',
        lastModified: new Date('2023-01-01'),
        description: 'Basketball is good',
      },
      {
        id: '2',
        name: 'Football',
        lastModified: new Date(),
        description: 'Football wow!',
      },
    ]).pipe(
      delay(1000),
      tap(products =>
        this.productBS.next({
          ...this.state,
          data: products,
          loading: false,
        }),
      ),
      catchError(error => {
        this.productBS.next({
          ...this.state,
          error,
          loading: false,
        });
        return EMPTY;
      }),
    );
  }

  updateProduct(product: Product) {
    // return this.http.patch<Product>(`/api/products/${product.id}`, product).pipe(
    return of<Product>({ ...product, lastModified: new Date() }).pipe(
      delay(1000),
      // concatMap(() => {
      //   throw new Error('error handling');
      // }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteProduct(product: Product) {
    // return this.http.delete<Product>(`/api/products/${product.id}`).pipe(
    return of(null).pipe(
      delay(1000),
      // concatMap(() => {
      //   throw new Error('error handling');
      // }),
    );
  }
}
