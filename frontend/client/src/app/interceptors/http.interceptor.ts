import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '@frontend/services';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authFacade: AuthFacade = inject(AuthFacade);
  const accessToken: string = authFacade.accessToken();
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
  });

  return next(modifiedReq);
};
