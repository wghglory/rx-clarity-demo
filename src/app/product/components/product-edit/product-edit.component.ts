import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { EMPTY, share, Subject, switchMap, tap } from 'rxjs';
import { api } from '@shared/operators/api.operator';
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

  private saveSubject = new Subject<void>();

  update$ = this.saveSubject.pipe(
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
