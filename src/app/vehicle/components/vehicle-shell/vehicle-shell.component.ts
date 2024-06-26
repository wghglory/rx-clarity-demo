import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StandaloneModule } from 'src/app/shared/standalone.module';

import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { VehicleListSignalComponent } from '../vehicle-list-signal/vehicle-list-signal.component';

@Component({
  selector: 'app-vehicle-shell',
  standalone: true,
  imports: [StandaloneModule, VehicleListComponent, VehicleListSignalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vehicle-shell.component.html',
  styleUrl: './vehicle-shell.component.scss',
})
export class VehicleShellComponent {}
