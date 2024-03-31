import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { CartItem } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [StandaloneModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartService);

  quantities = Array.from({ length: 1000 }, (_, index) => index + 1);

  cartItems$ = this.cartService.cartItems$;
  subTotal$ = this.cartService.subTotal$;
  deliveryFee$ = this.cartService.deliveryFee$;
  tax$ = this.cartService.tax$;
  totalPrice$ = this.cartService.totalPrice$;

  onQuantityChanged(item: CartItem, quantity: string) {
    this.cartService.updateInCart(item, Number(quantity));
  }

  onRemove(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
}
