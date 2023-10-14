import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';
import {
  AccessToken,
  CreateUserGQL,
  CreateUserMutation,
  LoginWithPasswordGQL,
  LoginWithPasswordMutation,
} from '@frontend/graphql';
import { MutationResult } from 'apollo-angular';

@Injectable()
export class AuthEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly loginWithPasswordGQL: LoginWithPasswordGQL =
    inject(LoginWithPasswordGQL);
  private readonly createUserGQL: CreateUserGQL = inject(CreateUserGQL);

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
}
