import { Product } from './../../models/product.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { api } from '@shared/operators/api.operator';
import { share, Subject, switchMap, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
})
export class ProductDeleteComponent {
  constructor(public productService: ProductService) {}

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
