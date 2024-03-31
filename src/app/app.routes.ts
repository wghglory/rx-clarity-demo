import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [{ path: '', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }],
  },
  {
    path: 'vehicles',
    children: [
      {
        path: '',
        loadComponent: () => import('./vehicle/components/vehicle-shell/vehicle-shell.component').then(m => m.VehicleShellComponent),
      },
    ],
  },
];
