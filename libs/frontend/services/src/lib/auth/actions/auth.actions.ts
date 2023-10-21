import {
  CreateUserInput,
  CreateUserMutation,
  LoginWithPasswordInput,
  LoginWithPasswordMutation,
  RefreshTokenMutation,
  RefreshTokensInput,
} from '@frontend/graphql';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login With Password': props<{ request: LoginWithPasswordInput }>(),
    'Login With Password Success': props<{
      response: LoginWithPasswordMutation;
    }>(),
    'Login With Password Fail': emptyProps(),
    Register: props<{ request: CreateUserInput }>(),
    'Register Success': props<{ response: CreateUserMutation }>(),
    'Register Fail': emptyProps(),
    'Refresh Tokens': props<{ request: RefreshTokensInput }>(),
    'Refresh Tokens Success': props<{ response: RefreshTokenMutation }>(),
    'Refresh Tokens Fail': emptyProps(),
  },
});
