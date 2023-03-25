import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-edit-store',
  templateUrl: './product-edit-store.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditStoreComponent {

}
