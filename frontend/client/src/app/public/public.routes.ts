import { Routes } from '@angular/router';
import { PublicView } from './public.view';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicView,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.view').then((c) => c.LoginView),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.view').then((c) => c.RegisterView),
      },
    ],
  },
];
