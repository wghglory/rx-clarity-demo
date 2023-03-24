import { Injectable } from '@angular/core';
import { ApiQuery } from '@shared/models/api-query.model';
import { BehaviorSubject, catchError, delay, EMPTY, Observable, of, tap, concatMap } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

const defaultState: ApiQuery<Product[]> = {
  loading: true,
  error: undefined,
  data: [],
};

@Injectable()
export class ProductService {
  private productSource = new BehaviorSubject<ApiQuery<Product[]>>(defaultState);
  products$ = this.productSource.asObservable();

  get state() {
    return this.productSource.getValue();
  }

  constructor(private http: HttpClient) {}

  setProducts(fn: (state: ApiQuery<Product[]>) => Partial<ApiQuery<Product[]>>) {
    const newState = fn(this.state);
    this.productSource.next({ ...this.state, ...newState });
  }

  getProducts(): Observable<Product[]> {
    this.productSource.next({ ...this.state, loading: true });

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
        this.productSource.next({
          ...this.state,
          data: products,
        }),
      ),
      catchError(error => {
        this.productSource.next({
          ...this.state,
          error,
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
