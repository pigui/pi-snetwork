import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';
import {
  CreateUserGQL,
  CreateUserMutation,
  LoginWithPasswordGQL,
  LoginWithPasswordMutation,
  RefreshTokenGQL,
  RefreshTokenMutation,
} from '@frontend/graphql';
import { MutationResult } from 'apollo-angular';
import { UiActions } from '../../ui/actions/ui.actions';

const START_LOADING = [
  AuthActions.loginWithPassword,
  AuthActions.refreshTokens,
];
const STOP_LOADING = [
  AuthActions.loginWithPasswordFail,
  AuthActions.registerFail,
  AuthActions.loginWithPasswordSuccess,
  AuthActions.refreshTokensFail,
  AuthActions.refreshTokensSuccess,
];

@Injectable()
export class AuthEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly loginWithPasswordGQL: LoginWithPasswordGQL =
    inject(LoginWithPasswordGQL);
  private readonly createUserGQL: CreateUserGQL = inject(CreateUserGQL);
  private readonly refreshTokensGQL: RefreshTokenGQL = inject(RefreshTokenGQL);

  loginWithPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWithPassword),
      concatMap((action) =>
        this.loginWithPasswordGQL
          .mutate({
            loginWithPasswordInput: action.request,
          })
          .pipe(
            map((response: MutationResult<LoginWithPasswordMutation>) =>
              AuthActions.loginWithPasswordSuccess({
                response: response.data as LoginWithPasswordMutation,
              })
            ),
            catchError(() => of(AuthActions.loginWithPasswordFail()))
          )
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      concatMap((action) =>
        this.createUserGQL.mutate({ createUserInput: action.request }).pipe(
          concatMap((response: MutationResult<CreateUserMutation>) =>
            of(
              AuthActions.registerSuccess({
                response: response.data as CreateUserMutation,
              }),
              AuthActions.loginWithPassword({
                request: {
                  email: action.request.email,
                  password: action.request.password,
                },
              })
            )
          ),
          catchError(() => of(AuthActions.registerFail()))
        )
      )
    );
  });

  refreshTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokens),
      concatMap((action) =>
        this.refreshTokensGQL
          .mutate({ refreshTokensInput: action.request })
          .pipe(
            map((response) =>
              AuthActions.refreshTokensSuccess({
                response: response.data as RefreshTokenMutation,
              })
            ),
            catchError(() => of(AuthActions.refreshTokensFail()))
          )
      )
    )
  );

  startLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...START_LOADING),
      map(() => UiActions.startLoading())
    );
  });

  stopLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...STOP_LOADING),
      map(() => UiActions.stopLoading())
    );
  });
}
