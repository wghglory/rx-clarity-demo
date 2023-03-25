import { Product } from '../../models/product.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { api } from '@shared/operators/api.operator';
import { share, Subject, switchMap, tap } from 'rxjs';
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

  private saveSubject = new Subject<void>();

  delete$ = this.saveSubject.pipe(
    switchMap(() =>
      this.productService.deleteProduct(this.selected!).pipe(
        tap(() => {
          this.productService.setProducts(state => {
            const data = state.data?.filter(item => {
              return item.id !== this.selected?.id;
            });

            this.close();

            return { ...state, data };
          });
        }),
        api(),
      ),
    ),
    share(),
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.saveSubject.next();
  }
}
