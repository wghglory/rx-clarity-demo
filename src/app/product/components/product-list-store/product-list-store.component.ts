import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list-store',
  templateUrl: './product-list-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListStoreComponent {

}
