import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductListStore } from '../product-list-store/product-list.store';

export interface ProductEditState {
  loading: boolean;
  error: HttpErrorResponse | null;
  openDialog: boolean;
}

const initialState: ProductEditState = {
  loading: false,
  error: null,
  openDialog: true,
};

@Injectable()
export class ProductEditStore extends ComponentStore<ProductEditState> {
  constructor(
    private productService: ProductService,
    private listStore: ProductListStore,
  ) {
    super(initialState);
  }

  // Selectors
  readonly openDialog$ = this.select(state => state.openDialog);

  // Updaters
  readonly callingAPI = this.updater(state => ({
    ...state,
    loading: true,
    error: null,
  }));

  readonly setSuccess = this.updater(state => ({
    ...state,
    loading: false,
    openDialog: false,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    loading: false,
    error,
  }));

  // Effects
  readonly updateProduct = this.effect((product$: Observable<Product>) =>
    product$.pipe(
      tap(() => this.callingAPI()),
      switchMap(product => {
        return this.productService.updateProduct(product).pipe(
          tapResponse(
            res => {
              this.setSuccess();
              this.listStore.updateItem(res);
            },
            (error: HttpErrorResponse) => this.setError(error),
          ),
        );
      }),
    ),
  );
}
