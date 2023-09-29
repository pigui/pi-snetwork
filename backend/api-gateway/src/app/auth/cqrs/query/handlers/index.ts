import { GetUserByEmailHandler } from './get-user-by-email.handler';
import { GetUserByIdHandler } from './get-user-by-id.handler';
import { GetUsersHandler } from './get-users.handler';

export const QUERY_HANDLERS = [
  GetUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
];
