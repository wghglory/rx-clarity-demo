import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductEditStore } from './product-edit.store';

@Component({
  selector: 'app-product-edit-store',
  templateUrl: './product-edit-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductEditStore],
})
export class ProductEditStoreComponent {
  constructor(private store: ProductEditStore) {}

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
    this.store.updateProduct(this.selected!);
  }
}
