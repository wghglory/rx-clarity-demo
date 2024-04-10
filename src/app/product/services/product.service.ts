import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';

import { Product } from '../models/product.model';

type ActionType = 'update' | 'delete';

@Injectable()
export class ProductService {
  private http = inject(HttpClient);

  // record the item to be mutated
  private mutatedProductBS = new BehaviorSubject<{ type: ActionType; product: Product } | null>(null);
  mutate$ = this.mutatedProductBS.asObservable();

  setProduct(payload: { type: ActionType; product: Product }) {
    this.mutatedProductBS.next(payload);
  }

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
    return this.http.get(`https://randomuser.me/api/`).pipe(map(() => ({ ...product, lastModified: new Date() })));

    // return this.http.patch<Product>(`/api/products/${product.id}`, product).pipe(

    // return of<Product>({ ...product, lastModified: new Date() }).pipe(
    //   delay(1000),
    //   // concatMap(() => {
    //   //   throw new Error('error handling');
    //   // }),
    // );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteProduct(product: Product) {
    return this.http.get(`https://randomuser.me/api/`).pipe(map(() => null));

    // return this.http.delete<Product>(`/api/products/${product.id}`).pipe(
    // return of(null).pipe(
    //   delay(1000),
    //   // concatMap(() => {
    //   //   throw new Error('error handling');
    //   // }),
    // );
  }
}
