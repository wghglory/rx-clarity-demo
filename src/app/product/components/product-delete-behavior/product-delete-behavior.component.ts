import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { createAsyncState } from 'ngx-extension';
import { share, Subject, switchMap, tap } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductBehaviorService } from '../../services/product-behavior.service';

@Component({
  selector: 'app-product-delete-behavior',
  templateUrl: './product-delete-behavior.component.html',
  styleUrls: ['./product-delete-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDeleteBehaviorComponent {
  constructor(public productService: ProductBehaviorService) {}

  @Input() selected: Product | undefined = undefined;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveAction = new Subject<void>();

  confirmState$ = this.saveAction.pipe(
    switchMap(() =>
      this.productService.deleteProduct(this.selected!).pipe(
        tap(() => {
          this.productService.setProducts(state => {
            const data = state.data?.filter(item => {
              return item.id !== this.selected?.id;
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
