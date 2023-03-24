import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [{ path: '', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }],
  },
];
