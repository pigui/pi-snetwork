import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../dto';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUEST_USER_KEY } from '../constants';

export const ActiveUser = createParamDecorator(
  (field: keyof User | undefined, context: ExecutionContext) => {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const user: User | undefined =
      ctx.getContext().req[REQUEST_USER_KEY][REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  }
);
