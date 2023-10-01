import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, state => state),

);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});

