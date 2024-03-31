import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { CartItem } from '../cart/cart.model';
import { CartSignalService } from './cart-signal.service';

@Component({
  selector: 'app-cart-signal',
  standalone: true,
  imports: [StandaloneModule, FormsModule],
  templateUrl: './cart-signal.component.html',
  styleUrl: './cart-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSignalComponent {
  private cartSignalService = inject(CartSignalService);

  quantities = Array.from({ length: 1000 }, (_, index) => index + 1);

  cartItems = this.cartSignalService.cartItems;
  subTotal = this.cartSignalService.subTotal;
  deliveryFee = this.cartSignalService.deliveryFee;
  tax = this.cartSignalService.tax;
  totalPrice = this.cartSignalService.totalPrice;

  onQuantityChanged(item: CartItem, quantity: string) {
    this.cartSignalService.updateInCart(item, Number(quantity));
  }

  onRemove(item: CartItem) {
    this.cartSignalService.removeFromCart(item);
  }
}
