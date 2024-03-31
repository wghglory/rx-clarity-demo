import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductDeleteStore } from './product-delete.store';

@Component({
  selector: 'app-product-delete-store',
  templateUrl: './product-delete-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDeleteStore],
})
export class ProductDeleteStoreComponent {
  constructor(private store: ProductDeleteStore) {}

  @Input() selected: Product | undefined = undefined;
  @Input() set open(openDialog: boolean) {
    this.store.patchState({ openDialog });
  }
  @Output() openChange = this.store.openDialog$;

  vm$ = this.store.state$;

  close() {
    this.store.patchState({ openDialog: false });
  }

  confirm() {
    this.store.deleteProduct(this.selected!);
  }
}
