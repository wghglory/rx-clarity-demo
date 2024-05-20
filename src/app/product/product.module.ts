import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AlertComponent, SpinnerComponent } from 'clr-lift';

import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDeleteBehaviorComponent } from './components/product-delete-behavior/product-delete-behavior.component';
import { ProductDeleteStoreComponent } from './components/product-delete-store/product-delete-store.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductEditBehaviorComponent } from './components/product-edit-behavior/product-edit-behavior.component';
import { ProductEditStoreComponent } from './components/product-edit-store/product-edit-store.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListBehaviorComponent } from './components/product-list-behavior/product-list-behavior.component';
import { ProductListStoreComponent } from './components/product-list-store/product-list-store.component';
import { ProductShellComponent } from './components/product-shell/product-shell.component';
import { ProductService } from './services/product.service';
import { ProductBehaviorService } from './services/product-behavior.service';

@NgModule({
  declarations: [
    ProductListBehaviorComponent,
    ProductDeleteBehaviorComponent,
    ProductEditBehaviorComponent,
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    ProductDeleteStoreComponent,
    ProductEditStoreComponent,
    ProductListStoreComponent,
  ],
  providers: [ProductBehaviorService, ProductService],
  imports: [
    CommonModule,
    ClarityModule,
    HttpClientModule,
    AlertComponent,
    SpinnerComponent,
    RouterModule.forChild([
      {
        path: '',
        component: ProductShellComponent,
      },
    ]),
  ],
})
export class ProductModule {}
