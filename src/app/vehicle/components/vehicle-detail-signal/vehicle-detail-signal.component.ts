import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { Vehicle } from '../../models/vehicle.model';
import { VehicleSignalService } from '../../services/vehicle-signal.service';
import { CartSignalService } from '../cart-signal/cart-signal.service';

@Component({
  selector: 'app-vehicle-detail-signal',
  standalone: true,
  imports: [StandaloneModule],
  templateUrl: './vehicle-detail-signal.component.html',
  styleUrl: './vehicle-detail-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetailSignalComponent {
  private vehicleSignalService = inject(VehicleSignalService);
  private cartSignalService = inject(CartSignalService);

  vehicle = this.vehicleSignalService.selectedVehicle;
  vehicleFilms = this.vehicleSignalService.vehicleFilms;

  addToCart(vehicle: Vehicle) {
    this.cartSignalService.addToCart(vehicle);
  }
}
