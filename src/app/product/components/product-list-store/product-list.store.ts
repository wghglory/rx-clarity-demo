import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Product } from '../../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { ProductStoreService } from '../../services/product-store.service';

export interface ProductListState {
  loading: boolean;
  error: HttpErrorResponse | null;
  products: Product[];
}

const initialState: ProductListState = {
  loading: false,
  error: null,
  products: [],
};

@Injectable()
export class ProductListStore extends ComponentStore<ProductListState> {
  constructor(private productService: ProductStoreService) {
    super(initialState);
  }

  // Selectors
  readonly vm$ = this.select(state => ({
    products: state.products,
    loading: state.loading,
    error: state.error,
  }));

  // Updaters
  readonly callingAPI = this.updater(state => ({
    ...state,
    loading: true,
    error: null,
  }));

  readonly setData = this.updater((state, products: Product[]) => ({
    ...state,
    products,
    loading: false,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    loading: false,
    error,
  }));

  readonly updateItem = this.updater((state, updatedItem: Product) => ({
    ...state,
    products: state.products.map(item => (item.id === updatedItem.id ? updatedItem : item)),
  }));

  readonly removeItem = this.updater((state, deletedItem: Product) => ({
    ...state,
    products: state.products.filter(item => item.id !== deletedItem.id),
  }));

  // Effects
  readonly getProducts = this.effect(trigger$ =>
    trigger$.pipe(
      tap(() => this.callingAPI()),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          tapResponse(
            res => this.setData(res),
            (error: HttpErrorResponse) => this.setError(error),
          ),
        );
      }),
    ),
  );
}
