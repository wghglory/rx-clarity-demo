import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { AlertComponent } from '@shared/ui/alert/alert.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';

import { ProductShellComponent } from './components/product-shell/product-shell.component';
import { ProductListBehaviorComponent } from './components/product-list-behavior/product-list-behavior.component';
import { ProductDeleteBehaviorComponent } from './components/product-delete-behavior/product-delete-behavior.component';
import { ProductEditBehaviorComponent } from './components/product-edit-behavior/product-edit-behavior.component';

@NgModule({
  declarations: [ProductListBehaviorComponent, ProductDeleteBehaviorComponent, ProductEditBehaviorComponent, ProductShellComponent],
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
