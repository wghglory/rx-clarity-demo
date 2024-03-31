import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { AlertComponent, dgState } from 'clr-extension';
import { AsyncState, createAsyncState, isEqual } from 'ngx-extension';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, share, switchMap } from 'rxjs';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CartComponent } from '../cart/cart.component';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [StandaloneModule, AlertComponent, VehicleDetailComponent, CartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private vehicleService = inject(VehicleService);

  private dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  // When the dgState parameter is set to false, it signals the execution of an API call even when the current state is identical to the previous state.
  // Conversely, emission is suppressed when dgState is true, thanks to the application of distinctUntilChanged.
  private dgState$ = this.dgBS.pipe(dgState(false));

  vehiclesState$ = combineLatest([this.dgState$, this.vehicleService.refresh$]).pipe(
    switchMap(() => this.vehicleService.vehicles$.pipe(createAsyncState())),
    share(),
  );

  total$ = this.vehiclesState$.pipe(
    filter(state => Boolean(state.data)),
    distinctUntilChanged<AsyncState<Vehicle[], HttpErrorResponse>>(isEqual),
    map(res => res.data?.length || 0),
  );

  selectVehicle(vehicle: Vehicle) {
    this.vehicleService.selectVehicle(vehicle);
  }

  refreshDg(state: ClrDatagridStateInterface) {
    this.dgBS.next(state);
  }

  refresh() {
    this.vehicleService.refresh();
  }
}
