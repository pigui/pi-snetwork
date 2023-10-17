import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '@frontend/services';
import { map } from 'rxjs';

export const PrivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authFacade: AuthFacade = inject(AuthFacade);
  const router: Router = inject(Router);
  return authFacade.accessToken$.pipe(
    map((accessToken: string) => {
      if (!accessToken) {
        router.navigate(['login']);
        return false;
      }
      return true;
    })
  );
};
