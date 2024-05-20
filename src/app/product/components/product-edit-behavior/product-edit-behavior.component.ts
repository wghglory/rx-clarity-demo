import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { createAsyncState } from 'ngx-lift';
import { share, Subject, switchMap, tap } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductBehaviorService } from '../../services/product-behavior.service';

@Component({
  selector: 'app-product-edit-behavior',
  templateUrl: './product-edit-behavior.component.html',
  styleUrls: ['./product-edit-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditBehaviorComponent {
  constructor(public productService: ProductBehaviorService) {}

  @Input() selected: Product | undefined = undefined;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveAction = new Subject<void>();

  confirmState$ = this.saveAction.pipe(
    switchMap(() =>
      this.productService.updateProduct(this.selected!).pipe(
        tap(updatedProduct => {
          this.productService.setProducts(state => {
            const data = state.data?.map(item => {
              return item.id === updatedProduct?.id ? updatedProduct : item;
            });

            return { ...state, data };
          });
        }),
        createAsyncState(() => this.close()),
      ),
    ),
    share(),
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.saveAction.next();
  }
}
