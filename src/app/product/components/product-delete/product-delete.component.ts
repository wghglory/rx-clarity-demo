import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { createAsyncState } from 'ngx-lift';
import { share, Subject, switchMap } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDeleteComponent {
  private productService = inject(ProductService);

  selected = input.required<Product>();
  open = model(false);

  private saveAction = new Subject<void>();

  confirmState$ = this.saveAction.pipe(
    switchMap(() => {
      const selected = this.selected();

      return this.productService.deleteProduct(selected).pipe(
        createAsyncState(() => {
          this.productService.setProduct({ type: 'delete', product: selected });
          this.close();
        }),
      );
    }),
    // share(),  // API executes only once even without share thanks to signal!
  );
  confirmState = toSignal(this.confirmState$);

  close() {
    this.open.set(false);
  }

  confirm() {
    this.saveAction.next();
  }
}
