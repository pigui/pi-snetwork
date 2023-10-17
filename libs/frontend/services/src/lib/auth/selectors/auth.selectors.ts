import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const getUser = createSelector(selectAuthState, (state) => state.user);

export const getAccessToken = createSelector(
  selectAuthState,
  (state) => state.accessToken
);

export const getRefreshToken = createSelector(
  selectAuthState,
  (state) => state.refreshToken
);
