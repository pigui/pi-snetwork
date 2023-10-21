import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'Ui',
  events: {
    'Start Loading': emptyProps(),
    'Stop Loading': emptyProps(),
  },
});
