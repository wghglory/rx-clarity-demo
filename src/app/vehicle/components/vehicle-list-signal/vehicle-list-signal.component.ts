import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClrDatagridStateInterface } from '@clr/angular';
import { AlertComponent, dgState } from 'clr-lift';
import { AsyncState, createAsyncState, isEqual } from 'ngx-lift';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, share, switchMap } from 'rxjs';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { Vehicle } from '../../models/vehicle.model';
import { VehicleSignalService } from '../../services/vehicle-signal.service';
import { CartSignalComponent } from '../cart-signal/cart-signal.component';
import { VehicleDetailSignalComponent } from '../vehicle-detail-signal/vehicle-detail-signal.component';

@Component({
  selector: 'app-vehicle-list-signal',
  standalone: true,
  imports: [StandaloneModule, AlertComponent, VehicleDetailSignalComponent, CartSignalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vehicle-list-signal.component.html',
  styleUrl: './vehicle-list-signal.component.scss',
})
export class VehicleListSignalComponent {
  private vehicleSignalService = inject(VehicleSignalService);

  private dgBS = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  // When the dgState parameter is set to false, it signals the execution of an API call even when the current state is identical to the previous state.
  // Conversely, emission is suppressed when dgState is true, thanks to the application of distinctUntilChanged.
  private dgState$ = this.dgBS.pipe(dgState(false));

  private vehiclesState$ = combineLatest([this.dgState$, this.vehicleSignalService.refresh$]).pipe(
    switchMap(() => this.vehicleSignalService.vehicles$.pipe(createAsyncState())),
    share(),
  );
  vehiclesState = toSignal(this.vehiclesState$);

  total = toSignal(
    this.vehiclesState$.pipe(
      filter(state => Boolean(state.data)),
      distinctUntilChanged<AsyncState<Vehicle[], HttpErrorResponse>>(isEqual),
      map(res => res.data?.length),
    ),
    { initialValue: 0 },
  );

  selectVehicle(vehicle: Vehicle) {
    this.vehicleSignalService.selectVehicle(vehicle);
  }

  refreshDg(state: ClrDatagridStateInterface) {
    this.dgBS.next(state);
  }

  refresh() {
    this.vehicleSignalService.refresh();
  }
}
