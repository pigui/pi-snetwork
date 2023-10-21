import { Signal, inject } from '@angular/core';
import { Injectable } from '@nestjs/common';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import * as fromActions from '../actions/auth.actions';
import * as fromSelectors from '../selectors/auth.selectors';
import {
  CreateUserInput,
  LoginWithPasswordInput,
  RefreshTokensInput,
  User,
} from '@frontend/graphql';
import { Observable, map } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class AuthFacade {
  private readonly store: Store<AuthState> = inject(Store);
  private readonly actions$: Actions = inject(Actions);

  readonly user$: Observable<User | null> = this.store.pipe(
    select(fromSelectors.getUser)
  );

  readonly user: Signal<User | null> = this.store.selectSignal(
    fromSelectors.getUser
  );

  readonly loginPasswordSuccess$: Observable<boolean> = this.actions$.pipe(
    ofType(fromActions.AuthActions.loginWithPasswordSuccess),
    map((action) => !!action)
  );

  readonly accessToken$: Observable<string | null> = this.store.pipe(
    select(fromSelectors.getAccessToken)
  );

  readonly accessToken: Signal<string | null> = this.store.selectSignal(
    fromSelectors.getAccessToken
  );

  readonly refreshToken$: Observable<string | null> = this.store.pipe(
    select(fromSelectors.getRefreshToken)
  );

  readonly refreshToken: Signal<string | null> = this.store.selectSignal(
    fromSelectors.getRefreshToken
  );

  readonly refreshTokensSuccess$ = this.actions$.pipe(
    ofType(fromActions.AuthActions.refreshTokensSuccess)
  );

  readonly refreshTokensFail$ = this.actions$.pipe(
    ofType(fromActions.AuthActions.refreshTokensFail)
  );

  loginWithPassword(loginWithPasswordInput: LoginWithPasswordInput): void {
    this.store.dispatch(
      fromActions.AuthActions.loginWithPassword({
        request: loginWithPasswordInput,
      })
    );
  }

  createUser(createUserInput: CreateUserInput): void {
    this.store.dispatch(
      fromActions.AuthActions.register({ request: createUserInput })
    );
  }

  refreshTokens(refreshTokensInput: RefreshTokensInput): void {
    this.store.dispatch(
      fromActions.AuthActions.refreshTokens({ request: refreshTokensInput })
    );
  }
}
