import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-delete-store',
  templateUrl: './product-delete-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDeleteStoreComponent {

}
