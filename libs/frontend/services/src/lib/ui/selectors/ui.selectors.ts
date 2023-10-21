import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from '../reducers/ui.reducer';

export const selectUiState = createFeatureSelector<fromUi.UiState>(
  fromUi.uiFeatureKey
);

export const getIsLoading = createSelector(
  selectUiState,
  (state) => state.isLoading
);
