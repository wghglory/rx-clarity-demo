import { Product } from './../../models/product.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { api } from '@shared/operators/api.operator';
import { share, Subject, switchMap, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  constructor(public productService: ProductService) {}

  @Input() selected: Product | undefined = undefined;
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveSubject = new Subject<void>();

  update$ = this.saveSubject.pipe(
    switchMap(() =>
      this.productService.updateProduct(this.selected!).pipe(
        tap(updatedProduct => {
          this.productService.setProducts(state => {
            const data = state.data?.map(item => {
              return item.id === updatedProduct?.id ? updatedProduct : item;
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
