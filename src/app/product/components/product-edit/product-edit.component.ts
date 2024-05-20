import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { createAsyncState } from 'ngx-lift';
import { share, Subject, switchMap, tap } from 'rxjs';

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
  private productService = inject(ProductService);

  @Input({ required: true }) selected!: Product;
  @Input({ required: true }) open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveAction = new Subject<void>();

  confirmState$ = this.saveAction.pipe(
    switchMap(() => {
      return this.productService.updateProduct(this.selected).pipe(
        tap(product => {
          this.close();
          this.productService.setProduct({ type: 'update', product });
        }),
        createAsyncState(),
      );
    }),
    share(), // API executes multiple times without share
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.saveAction.next();
  }
}
