import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { User } from '@frontend/graphql';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, (state) => state)
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
