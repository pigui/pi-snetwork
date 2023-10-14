import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { User } from '@frontend/graphql';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginWithPassword, (state) => {
    return { ...state, user: null };
  }),
  on(AuthActions.loginWithPasswordSuccess, (state, action) => {
    return {
      ...state,
      user: action?.response?.loginWithPassword?.user,
      refreshToken: action?.response?.loginWithPassword?.refreshToken,
      accessToken: action?.response?.loginWithPassword?.accessToken,
    };
  }),
  on(AuthActions.loginWithPasswordFail, (state) => {
    return { ...state, user: null, accessToken: null, refreshToken: null };
  }),
  on(AuthActions.register, () => initialState),
  on(AuthActions.registerSuccess, () => initialState),
  on(AuthActions.registerFail, () => initialState)
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
