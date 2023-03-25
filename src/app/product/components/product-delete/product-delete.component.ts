import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { EMPTY, share, Subject, switchMap, tap } from 'rxjs';
import { api } from '@shared/operators/api.operator';
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
  constructor(public productService: ProductService) {}

  @Input() selected: Product | undefined = undefined;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveSubject = new Subject<void>();

  delete$ = this.saveSubject.pipe(
    switchMap(() => {
      const selected = this.selected;

      if (!selected) {
        return EMPTY;
      }

      return this.productService.deleteProduct(selected).pipe(
        tap(() => {
          this.productService.setProduct({ type: 'delete', product: selected });
          this.close();
        }),
        api(),
      );
    }),
    share(),
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.saveSubject.next();
  }
}
