import { Injectable } from '@angular/core';
import { combineLatest, map, scan, shareReplay, Subject } from 'rxjs';
import { Action } from 'src/app/shared/action.type';

import { Vehicle } from '../../models/vehicle.model';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemAction = new Subject<Action<CartItem>>();
  itemAction$ = this.itemAction.asObservable();

  cartItems$ = this.itemAction$.pipe(
    scan((items, itemAction) => this.modifyCart(items, itemAction), [] as CartItem[]),
    shareReplay(1),
  );

  // Total up the price for each item
  subTotal$ = this.cartItems$.pipe(map(items => items.reduce((a, b) => a + b.quantity * Number(b.vehicle.cost_in_credits), 0)));

  // Delivery is free if spending more than 100,000 credits
  deliveryFee$ = this.subTotal$.pipe(map(t => (t < 500000 ? 999 : 0)));

  // Tax could be based on shipping address zip code
  tax$ = this.subTotal$.pipe(map(t => Math.round(t * 10.75) / 100));

  // Total price
  totalPrice$ = combineLatest([this.subTotal$, this.deliveryFee$, this.tax$]).pipe(map(([st, d, t]) => st + d + t));

  // Add the vehicle to the cart as an Action<CartItem>
  addToCart(vehicle: Vehicle) {
    this.itemAction.next({
      item: { vehicle, quantity: 1 },
      action: 'add',
    });
  }

  // Remove the item from the cart
  removeFromCart(cartItem: CartItem) {
    this.itemAction.next({
      item: { vehicle: cartItem.vehicle, quantity: 0 },
      action: 'delete',
    });
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    this.itemAction.next({
      item: { vehicle: cartItem.vehicle, quantity },
      action: 'update',
    });
  }

  // Return the updated array of cart items
  private modifyCart(items: CartItem[], operation: Action<CartItem>): CartItem[] {
    if (operation.action === 'add') {
      const itemInCart = items.find(item => item.vehicle.name === operation.item.vehicle.name);
      if (itemInCart) {
        itemInCart.quantity += 1;
        return items.map(item => (item.vehicle.name === itemInCart.vehicle.name ? itemInCart : item));
      } else {
        return [...items, operation.item];
      }
    } else if (operation.action === 'update') {
      return items.map(item => (item.vehicle.name === operation.item.vehicle.name ? operation.item : item));
    } else if (operation.action === 'delete') {
      return items.filter(item => item.vehicle.name !== operation.item.vehicle.name);
    }
    return items;
  }
}
