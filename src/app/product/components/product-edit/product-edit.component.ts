import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { createAsyncState } from 'ngx-extension';
import { EMPTY, share, Subject, switchMap, tap } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent {
  constructor(public productService: ProductService) {}

  @Input() selected: Product | undefined = undefined;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveAction = new Subject<void>();

  confirmState$ = this.saveAction.pipe(
    switchMap(() => {
      const selected = this.selected;

      if (!selected) {
        return EMPTY;
      }

      return this.productService.updateProduct(selected).pipe(
        tap(product => {
          this.close();
          this.productService.setProduct({ type: 'update', product });
        }),
        createAsyncState(),
      );
    }),
    share(),
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.saveAction.next();
  }
}
