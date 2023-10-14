import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.routes').then((r) => r.publicRoutes),
  },
];
