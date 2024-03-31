import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, forkJoin, map, switchMap } from 'rxjs';

import { Film, Vehicle, VehicleResponse } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleSignalService {
  private http = inject(HttpClient);

  // Action stream
  private refreshBS = new BehaviorSubject<boolean>(true);
  refresh$ = this.refreshBS.asObservable();

  selectedVehicle = signal<Vehicle | undefined>(undefined);

  // First page of vehicles
  // If the price is empty, randomly assign a price
  // (We can't modify the backend in this demo)
  vehicles$ = this.http.get<VehicleResponse>('https://swapi.py4e.com/api/vehicles').pipe(
    map(data => {
      // throw new Error('failed to load API.');
      return data.results.map(
        v =>
          ({
            ...v,
            cost_in_credits: isNaN(Number(v.cost_in_credits)) ? Math.random() * 100000 : Number(v.cost_in_credits),
          }) as Vehicle,
      );
    }),
  );
  vehicles = toSignal(this.vehicles$, { initialValue: [] });

  private vehicleFilms$ = toObservable(this.selectedVehicle).pipe(
    filter(Boolean),
    switchMap(vehicle => forkJoin(vehicle.films.map(link => this.http.get<Film>(link)))),
  );
  vehicleFilms = toSignal<Film[], Film[]>(this.vehicleFilms$, { initialValue: [] });

  selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle.set(vehicle);
  }
  refresh() {
    this.refreshBS.next(true);
  }
}
