import { Vehicle } from '../../models/vehicle.model';

export interface Cart {
  cartItems: CartItem[];
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}
