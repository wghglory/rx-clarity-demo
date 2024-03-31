import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [StandaloneModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetailComponent {
  private vehicleService = inject(VehicleService);
  private cartService = inject(CartService);

  vehicle$ = this.vehicleService.selectedVehicle$;
  vehicleFilms$ = this.vehicleService.vehicleFilms$;

  addToCart(vehicle: Vehicle) {
    this.cartService.addToCart(vehicle);
  }
}
