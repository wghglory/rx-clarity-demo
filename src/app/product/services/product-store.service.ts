import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
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
