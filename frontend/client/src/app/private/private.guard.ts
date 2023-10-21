import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthActions, AuthFacade } from '@frontend/services';
import { concatMap, filter, map, merge, of, take } from 'rxjs';

export const PrivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authFacade: AuthFacade = inject(AuthFacade);
  const router: Router = inject(Router);
  const refreshToken = authFacade.refreshToken();
  if (!refreshToken) {
    router.navigate(['login']);
    return false;
  }
  authFacade.refreshTokens({ refreshToken });
  return merge(
    authFacade.refreshTokensSuccess$,
    authFacade.refreshTokensFail$
  ).pipe(
    concatMap((refreshAction) => {
      if (refreshAction.type === AuthActions.refreshTokensSuccess.type) {
        return authFacade.accessToken$.pipe(
          map((accessToken: string) => {
            if (!accessToken) {
              router.navigate(['login']);
              return false;
            }
            return true;
          })
        );
      }
      router.navigate(['login']);
      return of(false);
    })
  );
};
