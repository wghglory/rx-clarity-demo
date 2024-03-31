import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductListStore } from './product-list.store';

@Component({
  selector: 'app-product-list-store',
  templateUrl: './product-list-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductListStore],
})
export class ProductListStoreComponent implements OnInit {
  constructor(public store: ProductListStore) {}

  openEditDialog = false;
  openDeleteDialog = false;
  selected: Product | undefined;

  vm$ = this.store.vm$;

  editProduct(selected: Product) {
    this.openEditDialog = true;
    this.selected = selected;
  }

  deleteProduct(selected: Product) {
    this.openDeleteDialog = true;
    this.selected = selected;
  }

  ngOnInit() {
    this.store.getProducts();
  }
}
