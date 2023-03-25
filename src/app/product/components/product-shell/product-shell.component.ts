import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent {}
