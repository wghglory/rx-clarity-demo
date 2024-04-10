import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ClarityIcons, shoppingCartIcon, vmBugIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

import { CartSignalService } from './vehicle/components/cart-signal/cart-signal.service';

ClarityIcons.addIcons(vmBugIcon, shoppingCartIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ClarityModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private cartService = inject(CartSignalService);

  quantities = this.cartService.quantities;
}
