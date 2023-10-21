import { createFeature, createReducer, on } from '@ngrx/store';
import { UiActions } from '../actions/ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  isLoading: boolean;
}

export const initialState: UiState = {
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(UiActions.startLoading, (state) => {
    return { ...state, isLoading: true };
  }),
  on(UiActions.stopLoading, (state) => {
    return { ...state, isLoading: false };
  })
);

export const uiFeature = createFeature({
  name: uiFeatureKey,
  reducer,
});
