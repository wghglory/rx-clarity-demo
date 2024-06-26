import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { AsyncState, createAsyncState } from 'ngx-lift';
import { combineLatest, scan, shareReplay } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  providers: [ProductService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private productService = inject(ProductService);

  openEditDialog = false;
  openDeleteDialog = false;
  selected: Product | undefined;

  private initialProductsState$ = this.productService.getProducts().pipe(createAsyncState(), shareReplay(1));

  productsState$ = combineLatest([this.initialProductsState$, this.productService.mutate$]).pipe(
    scan(
      (acc, [initial, item]) => {
        if (isEmpty(item)) {
          return initial;
        }

        switch (item.type) {
          case 'delete':
            return {
              ...acc,
              data: acc.data?.filter(v => v.id !== item.product.id) || null,
            };
          case 'update':
            return {
              ...acc,
              data: acc.data?.map(v => (v.id === item.product.id ? item.product : v)) as Product[],
            };
          default:
            return acc;
        }
      },
      {} as AsyncState<Product[]>,
    ),
  );

  editProduct(selected: Product) {
    this.selected = selected;
    this.openEditDialog = true;
  }

  deleteProduct(selected: Product) {
    this.selected = selected;
    this.openDeleteDialog = true;
  }
}
