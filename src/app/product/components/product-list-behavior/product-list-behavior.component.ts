import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductBehaviorService } from '../../services/product-behavior.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list-behavior',
  templateUrl: './product-list-behavior.component.html',
  styleUrls: ['./product-list-behavior.component.scss'],
  providers: [ProductBehaviorService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListBehaviorComponent {
  constructor(public productService: ProductBehaviorService) {}

  openEditDialog = false;
  openDeleteDialog = false;
  selected: Product | undefined;

  trigger$ = this.productService.getProducts();

  products$ = this.productService.products$;

  editProduct(selected: Product) {
    this.openEditDialog = true;
    this.selected = selected;
  }

  deleteProduct(selected: Product) {
    this.openDeleteDialog = true;
    this.selected = selected;
  }

  trackByFn(index: number, item: Product) {
    return item.id;
  }
}
