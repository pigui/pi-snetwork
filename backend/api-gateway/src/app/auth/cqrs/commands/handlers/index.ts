import { CreateUserHandler } from './create-user.handler';
import { LoginWithPasswordHandler } from './login-with-password.handler';

export const COMMAND_HANDLERS = [CreateUserHandler, LoginWithPasswordHandler];
