import { Routes } from '@angular/router';
import { PrivateGuard } from './private.guard';

export const privateRoutes: Routes = [
  {
    canActivate: [PrivateGuard],
    path: '',
    loadComponent: () => import('./private.view').then((c) => c.PrivateView),
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((r) => r.homeRoutes),
      },
    ],
  },
];
