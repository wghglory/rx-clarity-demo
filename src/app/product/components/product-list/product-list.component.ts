import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ApiQuery } from '@shared/models/api-query.model';
import { combineLatest, scan, shareReplay } from 'rxjs';
import { api } from '@shared/operators/api.operator';

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
  constructor(public productService: ProductService) {}

  openEditDialog = false;
  openDeleteDialog = false;
  selected: Product | undefined;

  private initialProducts$ = this.productService.getProducts().pipe(api(), shareReplay(1));

  products$ = combineLatest([this.initialProducts$, this.productService.mutate$]).pipe(
    scan((acc, [initial, item]) => {
      if (!item) {
        return initial;
      }

      switch (item.type) {
        case 'delete':
          return {
            ...acc,
            data: acc.data?.filter(v => v.id !== item.product.id),
          };
        case 'update':
          return {
            ...acc,
            data: acc.data?.map(v => (v.id === item.product.id ? item.product : v)) as Product[],
          };
        default:
          return acc;
      }
    }, {} as ApiQuery<Product[]>),
  );

  editProduct(selected: Product) {
    this.openEditDialog = true;
    this.selected = selected;
  }

  deleteProduct(selected: Product) {
    this.openDeleteDialog = true;
    this.selected = selected;
  }

  trackByFn(index: number, item: Product) {
    return item.id;
  }
}
