import { Injectable, Signal, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UiState } from '../reducers/ui.reducer';
import * as fromSelectors from '../selectors/ui.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class UiFacade {
  private readonly store: Store<UiState> = inject(Store);

  isLoading$: Observable<boolean> = this.store.pipe(
    select(fromSelectors.getIsLoading)
  );

  isLoading: Signal<boolean> = this.store.selectSignal(
    fromSelectors.getIsLoading
  );
}
