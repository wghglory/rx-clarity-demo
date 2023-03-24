import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { ApiQuery } from '@shared/models/api-query.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService],
})
export class ProductListComponent {
  constructor(public productService: ProductService) {}

  openEditDialog = false;
  openDeleteDialog = false;
  selected: Product | undefined;

  trigger$ = this.productService.getProducts();

  products$: Observable<ApiQuery<Product[]>> = this.productService.products$;

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
