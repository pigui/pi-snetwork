import { CreateUserHandler } from './create-user.handler';
import { LoginWithPasswordHandler } from './login-with-password.handler';
import { RefreshTokensHandler } from './refresh-tokens.handler';

export const COMMAND_HANDLERS = [
  CreateUserHandler,
  LoginWithPasswordHandler,
  RefreshTokensHandler,
];
