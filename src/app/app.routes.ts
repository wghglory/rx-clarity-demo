import { Route } from '@angular/router';

import { ComputedAsyncDemoComponent } from './computed-async-demo/computed-async-demo.component';
import { UserTodosComponent } from './computed-async-demo/user-todos/user-todos.component';

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
  {
    path: 'computed-async',
    component: ComputedAsyncDemoComponent,
    children: [
      {
        path: ':id',
        component: UserTodosComponent,
      },
    ],
  },
];
