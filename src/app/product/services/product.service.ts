import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, EMPTY, Observable, of, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  // record the item to be mutated
  private mutateProduct = new BehaviorSubject<{ type: 'update' | 'delete'; product: Product } | undefined>(undefined);
  mutate$ = this.mutateProduct.asObservable();

  setProduct(payload: { type: 'update' | 'delete'; product: Product }) {
    this.mutateProduct.next(payload);
  }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
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
    ]).pipe(delay(1000));
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
