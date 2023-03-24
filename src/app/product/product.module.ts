import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { AlertComponent } from '@shared/ui/alert/alert.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductShellComponent } from './components/product-shell/product-shell.component';

@NgModule({
  declarations: [ProductListComponent, ProductDeleteComponent, ProductEditComponent, ProductShellComponent],
  imports: [
    CommonModule,
    ClarityModule,
    HttpClientModule,
    AlertComponent,
    RouterModule.forChild([
      {
        path: '',
        component: ProductShellComponent,
      },
    ]),
  ],
  exports: [ProductListComponent, ProductDeleteComponent, ProductEditComponent],
})
export class ProductModule {}
