import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { VehicleService } from '../../services/vehicle.service';

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

  vehicle$ = this.vehicleService.selectedVehicle$;
  vehicleFilms$ = this.vehicleService.vehicleFilms$;
}
